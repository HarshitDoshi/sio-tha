import { UseMutationResult } from "@tanstack/react-query";
import { ITransaction, ITransactionRequest, ITransactionType, ITransactionTypeRequest, ITypeWithSpaceId } from "../../utilities/types";
import { AxiosError } from "axios";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

type IUseCreateTransactionState = ITypeWithSpaceId;

type ICreateFooter = ITypeWithSpaceId;

type IVisualizeTransactions = ITypeWithSpaceId;

type IField = {
  formControl: Control<ITransactionRequest, unknown>;
  formErrors: FieldErrors<ITransactionRequest>;
};

type IAmountField = IField;

type ITypeField = {
  transactionTypes: ITransactionType[] | undefined;
  createTransactionTypeMutation: UseMutationResult<ITransactionType, AxiosError<unknown, unknown>, ITransactionTypeRequest, unknown>;
} & IField;

type IOccurredDatetimeField = IField;

type ICreateForm = {
  formHandleSubmit: UseFormHandleSubmit<ITransactionRequest, undefined>;
  createTransactionMutation: UseMutationResult<ITransaction, AxiosError<unknown, unknown>, ITransactionRequest, unknown>;
  toggleCreateTransactionDrawer: (newOpen: boolean) => () => void;
} & ITypeWithSpaceId & IField & ITypeField;

export type { IUseCreateTransactionState, IField, ICreateFooter, IVisualizeTransactions, IAmountField, ITypeField, IOccurredDatetimeField, ICreateForm };