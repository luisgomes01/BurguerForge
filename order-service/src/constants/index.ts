export const CHEESE_BURGUER = "cheeseburguer";
export const VEGGIE_BURGUER = "veggieburguer";
export const BACON_BURGUER = "baconburguer";

const threeSeconds = 3000;
const sixSeconds = 6000;
const nineSeconds = 9000;

// Lead time to simulate asynchronous operations/preparation time
export const LEAD_TIME_MAPPING = {
  CHEESE_BURGUER: threeSeconds,
  VEGGIE_BURGUER: sixSeconds,
  BACON_BURGUER: nineSeconds,
};
