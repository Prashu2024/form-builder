import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { apiService } from '../services/apiService';
import { validateField } from '../utils/validators';
import FormField from './FormField';

const DynamicForm = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  
  const { data: schema, isLoading, error } = useQuery({
    queryKey: ['formSchema'],
    queryFn: apiService.fetchFormSchema,
  });

  const mutation = useMutation({
    mutationFn: apiService.submitForm,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      onSuccess();
    },
  });

  const form = useForm({
    defaultValues: {},
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-800">Error Loading Form</h3>
          <p className="text-red-600 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{schema.title}</h1>
        <p className="text-gray-600 mb-6">{schema.description}</p>

        <div onSubmit={handleFormSubmit}>
          {schema.fields.map((field) => (
            <form.Field
              key={field.name}
              name={field.name}
              validators={{
                onChange: ({ value }) => validateField(value, field),
              }}
            >
              {(fieldApi) => <FormField field={field} fieldApi={fieldApi} />}
            </form.Field>
          ))}

          {mutation.isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800">Submission Failed</h3>
                {mutation.error?.errors ? (
                  <ul className="text-red-600 text-sm mt-1">
                    {Object.entries(mutation.error.errors).map(([field, error]) => (
                      <li key={field}>
                        {field}: {error}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-red-600 text-sm">{mutation.error?.message || 'Unknown error'}</p>
                )}
              </div>
            </div>
          )}

          {mutation.isSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">Success!</h3>
                <p className="text-green-600 text-sm">Form submitted successfully</p>
              </div>
            </div>
          )}

          <button
            onClick={handleFormSubmit}
            disabled={mutation.isPending}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {mutation.isPending ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;