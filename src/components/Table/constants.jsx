export const tableColumns = [
    { id: 'user_id', label: 'UserId', minWidth: 170 },
    { id: 'createdAt', label: 'Created At', minWidth: 100, type: "Timestamp"},
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'error_message',
      label: 'Error Message',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'response_object',
      label: 'Response Object',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'request_object',
      label: 'Request Object',
      minWidth: 170,
      align: 'right',
      format: (value) => JSON.parse(value),
    }
];
