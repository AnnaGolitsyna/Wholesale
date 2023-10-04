export const selectorActiveContractors = (state) =>
  state.contractors.contractors.filter((contractor) => contractor.active);

export const selectorInactiveContractors = (state) =>
  state.contractors.contractors.filter((contractor) => !contractor.active);
