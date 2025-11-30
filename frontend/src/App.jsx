import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DynamicForm from './components/DynamicForm';
import SubmissionsTable from './components/SubmissionsTable';

const queryClient = new QueryClient();

const App = () => {
  const [view, setView] = useState('form');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setView('form')}
              className={`px-6 py-2 rounded-lg font-semibold ${
                view === 'form'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Form
            </button>
            <button
              onClick={() => setView('submissions')}
              className={`px-6 py-2 rounded-lg font-semibold ${
                view === 'submissions'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Submissions
            </button>
          </div>

          {view === 'form' ? (
            <DynamicForm onSuccess={() => setView('submissions')} />
          ) : (
            <SubmissionsTable />
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;

















// import React, { useState } from "react";
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
//   useMutation,
// } from "@tanstack/react-query";
// import { useForm } from "@tanstack/react-form";
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   createColumnHelper,
// } from "@tanstack/react-table";
// import {
//   Calendar,
//   AlertCircle,
//   CheckCircle,
//   Loader2,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// const queryClient = new QueryClient();

// // API Configuration - UPDATE THIS WITH YOUR BACKEND URL
// const API_BASE_URL = "http://localhost:8000/api";

// // API Functions
// const fetchFormSchema = async () => {
//   const response = await fetch(`${API_BASE_URL}/form-schema`);
//   if (!response.ok) throw new Error("Failed to fetch form schema");
//   return response.json();
// };

// const submitForm = async (data) => {
//   const response = await fetch(`${API_BASE_URL}/submissions`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   const result = await response.json();
//   if (!response.ok) throw result;
//   return result;
// };

// const fetchSubmissions = async ({ page, limit, sortBy, sortOrder }) => {
//   const params = new URLSearchParams({
//     page: page.toString(),
//     limit: limit.toString(),
//     sortBy: sortBy || "createdAt",
//     sortOrder: sortOrder || "desc",
//   });
//   const response = await fetch(`${API_BASE_URL}/submissions?${params}`);
//   if (!response.ok) throw new Error("Failed to fetch submissions");
//   return response.json();
// };

// // Dynamic Form Component
// const DynamicForm = ({ onSuccess }) => {
//   const {
//     data: schema,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["formSchema"],
//     queryFn: fetchFormSchema,
//   });

//   const mutation = useMutation({
//     mutationFn: submitForm,
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["submissions"] });
//       onSuccess();
//     },
//   });

//   const form = useForm({
//     defaultValues: {},
//     onSubmit: async ({ value }) => {
//       mutation.mutate(value);
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
//         <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
//         <div>
//           <h3 className="font-semibold text-red-800">Error Loading Form</h3>
//           <p className="text-red-600 text-sm">{error.message}</p>
//         </div>
//       </div>
//     );
//   }

//   const validateField = (value, field) => {
//     if (
//       field.required &&
//       (!value || (Array.isArray(value) && value.length === 0))
//     ) {
//       return `${field.label} is required`;
//     }

//     if (field.validation) {
//       const v = field.validation;

//       if (v.minLength && value && value.length < v.minLength) {
//         return `Minimum ${v.minLength} characters required`;
//       }

//       if (v.maxLength && value && value.length > v.maxLength) {
//         return `Maximum ${v.maxLength} characters allowed`;
//       }

//       if (v.regex && value && !new RegExp(v.regex).test(value)) {
//         return v.regexMessage || "Invalid format";
//       }

//       if (v.min !== undefined && value < v.min) {
//         return `Minimum value is ${v.min}`;
//       }

//       if (v.max !== undefined && value > v.max) {
//         return `Maximum value is ${v.max}`;
//       }

//       if (v.minDate && value && new Date(value) < new Date(v.minDate)) {
//         return `Date must be after ${v.minDate}`;
//       }

//       if (
//         v.minSelected &&
//         Array.isArray(value) &&
//         value.length < v.minSelected
//       ) {
//         return `Select at least ${v.minSelected} option(s)`;
//       }

//       if (
//         v.maxSelected &&
//         Array.isArray(value) &&
//         value.length > v.maxSelected
//       ) {
//         return `Select at most ${v.maxSelected} option(s)`;
//       }
//     }

//     return undefined;
//   };

//   const renderField = (field) => {
//     return (
//       <form.Field
//         key={field.name}
//         name={field.name}
//         validators={{
//           onChange: ({ value }) => validateField(value, field),
//         }}
//       >
//         {(fieldApi) => {
//           const { state, handleChange, handleBlur } = fieldApi;

//           return (
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {field.label}
//                 {field.required && <span className="text-red-500 ml-1">*</span>}
//               </label>

//               {field.type === "text" && (
//                 <input
//                   type="text"
//                   value={state.value || ""}
//                   onChange={(e) => handleChange(e.target.value)}
//                   onBlur={handleBlur}
//                   placeholder={field.placeholder}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               )}

//               {field.type === "number" && (
//                 <input
//                   type="number"
//                   value={state.value || ""}
//                   onChange={(e) => handleChange(Number(e.target.value))}
//                   onBlur={handleBlur}
//                   placeholder={field.placeholder}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               )}

//               {field.type === "select" && (
//                 <select
//                   value={state.value || ""}
//                   onChange={(e) => handleChange(e.target.value)}
//                   onBlur={handleBlur}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select {field.label}</option>
//                   {field.options?.map((opt) => (
//                     <option key={opt.value} value={opt.value}>
//                       {opt.label}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               {field.type === "multi-select" && (
//                 // <select
//                 //   multiple
//                 //   value={state.value || []}
//                 //   onChange={(e) => {
//                 //     const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
//                 //     handleChange(values);
//                 //   }}
//                 //   onBlur={handleBlur}
//                 //   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
//                 // >
//                 //   {field.options?.map((opt) => (
//                 //     <option key={opt.value} value={opt.value}>
//                 //       {opt.label}
//                 //     </option>
//                 //   ))}
//                 // </select>

//                 <div className="relative">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const dropdownId = `dropdown-${field.name}`;
//                       const dropdown = document.getElementById(dropdownId);
//                       if (dropdown) {
//                         dropdown.classList.toggle("hidden");
//                       }
//                     }}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <span className="text-gray-700">
//                       {state.value && state.value.length > 0
//                         ? `${state.value.length} selected`
//                         : field.placeholder || `Select ${field.label}`}
//                     </span>
//                     <svg
//                       className="w-5 h-5 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>

//                   <div
//                     id={`dropdown-${field.name}`}
//                     className="hidden absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
//                   >
//                     {field.options?.map((opt) => (
//                       <label
//                         key={opt.value}
//                         className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50"
//                       >
//                         <input
//                           type="checkbox"
//                           value={opt.value}
//                           checked={(state.value || []).includes(opt.value)}
//                           onChange={(e) => {
//                             const currentValues = state.value || [];
//                             let newValues;
//                             if (e.target.checked) {
//                               newValues = [...currentValues, opt.value];
//                             } else {
//                               newValues = currentValues.filter(
//                                 (v) => v !== opt.value
//                               );
//                             }
//                             handleChange(newValues);
//                           }}
//                           onBlur={handleBlur}
//                           className="mr-2 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//                         />
//                         <span className="text-sm text-gray-700">
//                           {opt.label}
//                         </span>
//                       </label>
//                     ))}
//                   </div>

//                   {state.value && state.value.length > 0 && (
//                     <div className="mt-2 flex flex-wrap gap-2">
//                       {state.value.map((val) => {
//                         const option = field.options?.find(
//                           (opt) => opt.value === val
//                         );
//                         return option ? (
//                           <span
//                             key={val}
//                             className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded"
//                           >
//                             {option.label}
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 const newValues = state.value.filter(
//                                   (v) => v !== val
//                                 );
//                                 handleChange(newValues);
//                               }}
//                               className="text-blue-500 hover:text-blue-700 font-bold"
//                             >
//                               ×
//                             </button>
//                           </span>
//                         ) : null;
//                       })}
//                     </div>
//                   )}
//                 </div>

//                 // <div className="relative">
//                 //   <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
//                 //     {field.options?.map((opt) => (
//                 //       <label key={opt.value} className="flex items-center py-1 cursor-pointer hover:bg-gray-50 px-2 rounded">
//                 //         <input
//                 //           type="checkbox"
//                 //           value={opt.value}
//                 //           checked={(state.value || []).includes(opt.value)}
//                 //           onChange={(e) => {
//                 //             const currentValues = state.value || [];
//                 //             let newValues;
//                 //             if (e.target.checked) {
//                 //               newValues = [...currentValues, opt.value];
//                 //             } else {
//                 //               newValues = currentValues.filter(v => v !== opt.value);
//                 //             }
//                 //             handleChange(newValues);
//                 //           }}
//                 //           onBlur={handleBlur}
//                 //           className="mr-2 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//                 //         />
//                 //         <span className="text-sm text-gray-700">{opt.label}</span>
//                 //       </label>
//                 //     ))}
//                 //   </div>
//                 //   {state.value && state.value.length > 0 && (
//                 //     <div className="mt-2 flex flex-wrap gap-2">
//                 //       {state.value.map((val) => {
//                 //         const option = field.options?.find(opt => opt.value === val);
//                 //         return option ? (
//                 //           <span key={val} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
//                 //             {option.label}
//                 //             <button
//                 //               type="button"
//                 //               onClick={() => {
//                 //                 const newValues = state.value.filter(v => v !== val);
//                 //                 handleChange(newValues);
//                 //               }}
//                 //               className="text-blue-500 hover:text-blue-700"
//                 //             >
//                 //               ×
//                 //             </button>
//                 //           </span>
//                 //         ) : null;
//                 //       })}
//                 //     </div>
//                 //   )}
//                 // </div>
//               )}

//               {field.type === "date" && (
//                 <input
//                   type="date"
//                   value={state.value || ""}
//                   onChange={(e) => handleChange(e.target.value)}
//                   onBlur={handleBlur}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               )}

//               {field.type === "textarea" && (
//                 <textarea
//                   value={state.value || ""}
//                   onChange={(e) => handleChange(e.target.value)}
//                   onBlur={handleBlur}
//                   placeholder={field.placeholder}
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               )}

//               {field.type === "switch" && (
//                 <label className="flex items-center cursor-pointer">
//                   <div className="relative">
//                     <input
//                       type="checkbox"
//                       checked={state.value || false}
//                       onChange={(e) => handleChange(e.target.checked)}
//                       onBlur={handleBlur}
//                       className="sr-only"
//                     />
//                     <div
//                       className={`block w-11 h-6 rounded-full ${
//                         state.value ? "bg-blue-500" : "bg-gray-300"
//                       }`}
//                     ></div>
//                     <div
//                       className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
//                         state.value ? "translate-x-5" : ""
//                       }`}
//                     ></div>
//                   </div>
//                   <span className="ml-3 text-sm text-gray-700">
//                     {field.placeholder}
//                   </span>
//                 </label>
//               )}

//               {state.meta.errors.length > 0 && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {state.meta.errors[0]}
//                 </p>
//               )}
//             </div>
//           );
//         }}
//       </form.Field>
//     );
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     form.handleSubmit();
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">
//           {schema.title}
//         </h1>
//         <p className="text-gray-600 mb-6">{schema.description}</p>

//         <div onSubmit={handleFormSubmit}>
//           {schema.fields.map(renderField)}

//           {mutation.isError && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
//               <div className="flex-1">
//                 <h3 className="font-semibold text-red-800">
//                   Submission Failed
//                 </h3>
//                 {mutation.error?.errors ? (
//                   <ul className="text-red-600 text-sm mt-1">
//                     {Object.entries(mutation.error.errors).map(
//                       ([field, error]) => (
//                         <li key={field}>
//                           {field}: {error}
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 ) : (
//                   <p className="text-red-600 text-sm">
//                     {mutation.error?.message || "Unknown error"}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           {mutation.isSuccess && (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-start gap-3">
//               <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
//               <div>
//                 <h3 className="font-semibold text-green-800">Success!</h3>
//                 <p className="text-green-600 text-sm">
//                   Form submitted successfully
//                 </p>
//               </div>
//             </div>
//           )}

//           <button
//             onClick={handleFormSubmit}
//             disabled={mutation.isPending}
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
//             {mutation.isPending ? "Submitting..." : "Submit Form"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Submissions Table Component
// const SubmissionsTable = () => {
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [viewSubmission, setViewSubmission] = useState(null);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["submissions", page, limit, sortOrder],
//     queryFn: () =>
//       fetchSubmissions({ page, limit, sortBy: "createdAt", sortOrder }),
//   });

//   const columnHelper = createColumnHelper();

//   const columns = [
//     columnHelper.accessor("id", {
//       header: "Submission ID",
//       cell: (info) => (
//         <span className="font-mono text-sm">{info.getValue()}</span>
//       ),
//     }),
//     columnHelper.accessor("createdAt", {
//       header: () => (
//         <button
//           onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
//           className="flex items-center gap-1 hover:text-blue-500"
//         >
//           Created Date
//           <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>
//         </button>
//       ),
//       cell: (info) => new Date(info.getValue()).toLocaleString(),
//     }),
//     columnHelper.display({
//       id: "actions",
//       header: "Actions",
//       cell: (info) => (
//         <button
//           onClick={() => setViewSubmission(info.row.original)}
//           className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
//         >
//           <Eye className="w-4 h-4" />
//           View
//         </button>
//       ),
//     }),
//   ];

//   const table = useReactTable({
//     data: data?.submissions || [],
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     manualPagination: true,
//     pageCount: data?.totalPages || 0,
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
//         <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
//         <div>
//           <h3 className="font-semibold text-red-800">
//             Error Loading Submissions
//           </h3>
//           <p className="text-red-600 text-sm">{error.message}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!data?.submissions || data.submissions.length === 0) {
//     return (
//       <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
//         <p className="text-gray-600">No submissions found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Submissions</h2>
//       <p className="text-gray-600 mb-4">Total Submissions: {data.total}</p>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="hover:bg-gray-50">
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="px-4 py-3 text-sm text-gray-700">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center gap-2">
//           <label className="text-sm text-gray-600">Items per page:</label>
//           <select
//             value={limit}
//             onChange={(e) => {
//               setLimit(Number(e.target.value));
//               setPage(1);
//             }}
//             className="px-2 py-1 border border-gray-300 rounded"
//           >
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={50}>50</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-600">
//             Page {page} of {data.totalPages}
//           </span>
//           <button
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//             className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => setPage(page + 1)}
//             disabled={page === data.totalPages}
//             className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {viewSubmission && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
//             <h3 className="text-xl font-bold mb-4">Submission Details</h3>
//             <div className="space-y-2">
//               <p className="text-sm">
//                 <span className="font-semibold">ID:</span> {viewSubmission.id}
//               </p>
//               <p className="text-sm">
//                 <span className="font-semibold">Created:</span>{" "}
//                 {new Date(viewSubmission.createdAt).toLocaleString()}
//               </p>
//               <div className="border-t pt-4 mt-4">
//                 <h4 className="font-semibold mb-2">Form Data:</h4>
//                 <pre className="bg-gray-50 p-4 rounded text-xs overflow-x-auto">
//                   {JSON.stringify(viewSubmission, null, 2)}
//                 </pre>
//               </div>
//             </div>
//             <button
//               onClick={() => setViewSubmission(null)}
//               className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   const [view, setView] = useState("form");

//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="min-h-screen bg-gray-100 py-8">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-center gap-4 mb-8">
//             <button
//               onClick={() => setView("form")}
//               className={`px-6 py-2 rounded-lg font-semibold ${
//                 view === "form"
//                   ? "bg-blue-500 text-white"
//                   : "bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               Form
//             </button>
//             <button
//               onClick={() => setView("submissions")}
//               className={`px-6 py-2 rounded-lg font-semibold ${
//                 view === "submissions"
//                   ? "bg-blue-500 text-white"
//                   : "bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               Submissions
//             </button>
//           </div>

//           {view === "form" ? (
//             <DynamicForm onSuccess={() => setView("submissions")} />
//           ) : (
//             <SubmissionsTable />
//           )}
//         </div>
//       </div>
//     </QueryClientProvider>
//   );
// };

// export default App;
