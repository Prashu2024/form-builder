import React from 'react';

const FormField = ({ field, fieldApi }) => {
  const { state, handleChange, handleBlur } = fieldApi;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {field.type === 'text' && (
        <input
          type="text"
          value={state.value || ''}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {field.type === 'number' && (
        <input
          type="number"
          value={state.value || ''}
          onChange={(e) => handleChange(Number(e.target.value))}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {field.type === 'select' && (
        <select
          value={state.value || ''}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select {field.label}</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {field.type === 'multi-select' && (
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              const dropdownId = `dropdown-${field.name}`;
              const dropdown = document.getElementById(dropdownId);
              if (dropdown) {
                dropdown.classList.toggle('hidden');
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">
              {state.value && state.value.length > 0
                ? `${state.value.length} selected`
                : field.placeholder || `Select ${field.label}`}
            </span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div
            id={`dropdown-${field.name}`}
            className="hidden absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            {field.options?.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={(state.value || []).includes(opt.value)}
                  onChange={(e) => {
                    const currentValues = state.value || [];
                    let newValues;
                    if (e.target.checked) {
                      newValues = [...currentValues, opt.value];
                    } else {
                      newValues = currentValues.filter(v => v !== opt.value);
                    }
                    handleChange(newValues);
                  }}
                  onBlur={handleBlur}
                  className="mr-2 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>

          {state.value && state.value.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {state.value.map((val) => {
                const option = field.options?.find(opt => opt.value === val);
                return option ? (
                  <span key={val} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                    {option.label}
                    <button
                      type="button"
                      onClick={() => {
                        const newValues = state.value.filter(v => v !== val);
                        handleChange(newValues);
                      }}
                      className="text-blue-500 hover:text-blue-700 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
      )}

      {field.type === 'date' && (
        <input
          type="date"
          value={state.value || ''}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {field.type === 'textarea' && (
        <textarea
          value={state.value || ''}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {field.type === 'switch' && (
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={state.value || false}
              onChange={(e) => handleChange(e.target.checked)}
              onBlur={handleBlur}
              className="sr-only"
            />
            <div className={`block w-11 h-6 rounded-full ${state.value ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${state.value ? 'translate-x-5' : ''}`}></div>
          </div>
          <span className="ml-3 text-sm text-gray-700">{field.placeholder}</span>
        </label>
      )}

      {state.meta.errors.length > 0 && (
        <p className="text-red-500 text-sm mt-1">{state.meta.errors[0]}</p>
      )}
    </div>
  );
};

export default FormField;