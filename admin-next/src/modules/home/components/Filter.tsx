import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Funnel } from "lucide-react";

export function Filter({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            {" "}
            <Funnel /> Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> Filters</DialogTitle>
            <DialogDescription>
              Add filters to refine your search
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6">{children}</div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
