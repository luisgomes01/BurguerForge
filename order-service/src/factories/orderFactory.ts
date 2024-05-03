import { LEAD_TIME_MAPPING } from "../constants/index.js";

const makeOrderFactory = (hamburguerType: string, price: number) => ({
  hamburguerType,
  price,
});

export const makeOrderDetailsFactory = (
  hamburguerType: string,
  price: number,
  email: string
) => ({
  routingKey: "",
  leadTime:
    LEAD_TIME_MAPPING[hamburguerType as keyof typeof LEAD_TIME_MAPPING] || 0,
  email,
  order: makeOrderFactory(hamburguerType, price),
});
