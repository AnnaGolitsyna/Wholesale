export const selectorActiveContractors = (state) =>
  state.contractors.filter((contractor) => contractor.active);
  
export const selectorInactiveContractors = (state) =>
  state.contractors.filter((contractor) => !contractor.active);
