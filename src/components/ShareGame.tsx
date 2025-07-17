import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function ShareGame({
  gameLink,
  pgn,
  playerA,
  playerB,
}: {
  gameLink: string;
  pgn: any;
  playerA: string;
  playerB: string;
}) {
  return (
    <div className="w-full mt-2">
      <Dialog>
        <DialogTrigger className="w-full">
          <Button
            variant={"outline"}
            className="w-full rounded-md py-3 cursor-pointer border border-primary"
          >
            Export Game
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogTitle>Share the game</DialogTitle>
          <div className="relative h-10 w-full">
            <Input
              disabled
              value={gameLink}
              className="py-2 text-md w-full border border-muted"
            />
            <Button
              className="absolute right-2 transform top-[2px] z-10 cursor-pointer"
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                navigator.clipboard.writeText(gameLink);
                toast.success("🗒️ Copied to clipboard");
              }}
            >
              <Copy size={16} />
            </Button>
          </div>

          <div className="mt-2 grid w-full gap-2">
            <Label htmlFor="pgnviewer" className="text-sm font-medium">
              PGN Viewer
            </Label>
            <div className="relative w-full">
              <Textarea value={pgn} rows={12} disabled className="h-64" />
              <Button
                className="absolute right-2 transform bottom-2 z-10 cursor-pointer"
                variant={"ghost"}
                size={"sm"}
                onClick={() => {
                  navigator.clipboard.writeText(pgn);
                  toast.success("🗒️ Copied to clipboard");
                }}
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
          <Button
            className="w-full mt-2 h-9"
            variant={"default"}
            onClick={() => {
              const blob = new Blob([pgn], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${playerA}-${playerB}-chessgame.pgn`;
              a.click();
              URL.revokeObjectURL(url);
              toast.success("🗒️ Downloaded PGN");
            }}
          >
            Download PGN
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
