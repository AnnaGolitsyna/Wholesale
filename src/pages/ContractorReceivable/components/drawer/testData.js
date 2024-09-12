const testData = [
  {
    key: '1',
    isConfirmed: true,
    dateStart: '2023-01-01',
    balanceStart: '10000.00',
    dateEnd: '2023-03-31',
    balanceEnd: '8500.00',
    notes: 'Q1 reconciliation completed',
  },
  {
    key: '2',
    isConfirmed: false,
    dateStart: '2023-04-01',
    balanceStart: '8500.00',
    dateEnd: '2023-06-30',
    balanceEnd: '9200.00',
    notes: 'Q2 pending confirmation',
  },
  {
    key: '3',
    isConfirmed: true,
    dateStart: '2023-07-01',
    balanceStart: '9200.00',
    dateEnd: '2023-09-30',
    balanceEnd: '7800.00',
    notes: 'Q3 reconciliation verified',
  },
  {
    key: '4',
    isConfirmed: false,
    dateStart: '2023-10-01',
    balanceStart: '7800.00',
    dateEnd: '2023-12-31',
    balanceEnd: '8900.00',
    notes: 'Q4 in progress',
  },
  {
    key: '5',
    isConfirmed: true,
    dateStart: '2024-01-01',
    balanceStart: '8900.00',
    dateEnd: '2024-03-31',
    balanceEnd: '9500.00',
    notes: 'Q1 2024 completed',
  },
];

export default testData;
