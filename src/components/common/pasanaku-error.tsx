import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon, ArrowUpDownIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

function formatError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return String(error);
  }
}

interface PasanakuErrorProps {
  error: unknown;
}

export function PasanakuError({ error }: PasanakuErrorProps) {
  return (
    <section className="h-full flex-1 flex items-center justify-center">
      <Empty className="min-h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={Alert01Icon} size={24} />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            We couldn't load your pasanaku games. Please try again later.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Collapsible className="w-full max-w-sm space-y-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <HugeiconsIcon icon={ArrowUpDownIcon} size={16} />
                Show error details
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <pre className="rounded-md bg-muted px-4 py-3 text-xs text-muted-foreground overflow-auto max-h-48 text-left whitespace-pre-wrap break-all">
                {formatError(error)}
              </pre>
            </CollapsibleContent>
          </Collapsible>
        </EmptyContent>
      </Empty>
    </section>
  );
}
