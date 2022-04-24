
export interface LunchOrder {
  name: string;
  orderId: string;
}

export function buildLunchOrder(name: string, orderId: string): LunchOrder {
  return {
    name: name,
    orderId: orderId
  }
};

