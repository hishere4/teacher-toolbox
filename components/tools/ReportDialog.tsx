"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Flag } from "lucide-react";

interface ReportDialogProps {
  toolId: string;
  toolTitle: string;
}

export function ReportDialog({ toolId, toolTitle }: ReportDialogProps) {
  const { data: session } = useSession();
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      setError("請先登入");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tools/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId, reason, userId: session.user.id }),
      });

      if (!res.ok) {
        throw new Error("舉報失敗");
      }

      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setReason("");
      }, 2000);
    } catch {
      setError("舉報時發生錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground w-full">
          <Flag className="h-4 w-4" />
          舉報工具
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>舉報工具</DialogTitle>
          <DialogDescription>
            舉報「{toolTitle}」
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <Alert className="mt-4">
            <AlertDescription>感謝你的舉報，我們會盡快處理。</AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="reason">舉報原因</Label>
              <Textarea
                id="reason"
                placeholder="請描述問題..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "提交中..." : "提交舉報"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                取消
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
