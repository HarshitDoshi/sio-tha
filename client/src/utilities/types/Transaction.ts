import { ISpace } from ".";

type ITransactionTypeRequest = {
  value: string;
};

type ITransactionType = {
  id: string;
  created_datetime: string;
  updated_datetime: string;
  value: string;
};

type ITransactionRequest = {
  type: ITransactionType['id'];
  amount: number;
  occurred_datetime: Date;
};

type ITransaction = {
  id: string;
  created_datetime: string;
  updated_datetime: string;
  occurred_datetime: string;
  type: ITransactionType;
  amount: number;
  space: ISpace;
};

export default ITransaction;
export type { ITransactionType, ITransactionRequest, ITransactionTypeRequest };