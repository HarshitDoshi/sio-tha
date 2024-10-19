import { useForm } from "react-hook-form";
import { useCreateTransaction, useCreateTransactionType, useTransactions, useTransactionTypes } from "../../utilities/services";
import { ITransactionRequest } from "../../utilities/types";
import { IUseCreateTransactionState } from ".";

const useCreateTransactionState = ({ spaceId }: IUseCreateTransactionState) => {
  const { data: transactionTypes, isLoading: isTransactionTypesLoading, error: transactionTypesError } = useTransactionTypes();
  const { data: transactions, isLoading: isTransactionsLoading, error: transactionsError } = useTransactions({ spaceId });
  const createTransactionTypeMutation = useCreateTransactionType();
  const createTransactionMutation = useCreateTransaction({ spaceId });

  const { register: formRegister, handleSubmit: formHandleSubmit, watch: formWatch, control: formControl, formState: { errors: formErrors } } = useForm<ITransactionRequest>({});

  return {
    transactionTypes,
    isTransactionTypesLoading,
    transactionTypesError,
    transactions,
    isTransactionsLoading,
    transactionsError,
    formRegister,
    formHandleSubmit,
    formWatch,
    formControl,
    formErrors,
    createTransactionTypeMutation,
    createTransactionMutation,
  };
};

export default useCreateTransactionState;