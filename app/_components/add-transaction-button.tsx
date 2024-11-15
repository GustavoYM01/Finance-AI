"use client";
import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "./ui/button";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  if (!userCanAddTransaction) {
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="cursor-not-allowed rounded-full font-bold"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                Adicionar transação <ArrowUpDownIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Você atingiu o limite de transações. Atualize seu plano para criar
              transações ilimitadas.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <UpsertTransactionDialog
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
        />
      </>
    );
  }
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={() => {
                setDialogIsOpen(true);
              }}
            >
              Adicionar transação <ArrowUpDownIcon />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
