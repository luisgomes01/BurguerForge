import { LEAD_TIME_MAPPING } from "../constants/index.js";

const makeOrderFactory = (hamburguerType: string, price: number) => ({
  hamburguerType,
  price,
  leadTime:
    LEAD_TIME_MAPPING[hamburguerType as keyof typeof LEAD_TIME_MAPPING] || 0,
});

export const makeOrderDetailsFactory = (
  hamburguerType: string,
  price: number,
  email: string
) => ({
  routingKey: "",
  email,
  order: makeOrderFactory(hamburguerType, price),
});
