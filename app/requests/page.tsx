"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  ThumbsUp, 
  User, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";

interface Request {
  id: string;
  titleZh: string;
  descZh: string;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED";
  upvotes: number;
  gradeLevels: string[];
  subjects: string[];
  createdAt: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  claimedBy: {
    id: string;
    name: string;
  } | null;
  completedTool: {
    id: string;
    slug: string;
    titleZh: string;
  } | null;
  _count: {
    votes: number;
  };
}

const statusConfig = {
  OPEN: { label: "開放中", color: "bg-green-100 text-green-700", icon: AlertCircle },
  IN_PROGRESS: { label: "進行中", color: "bg-yellow-100 text-yellow-700", icon: Loader2 },
  COMPLETED: { label: "已完成", color: "bg-blue-100 text-blue-700", icon: CheckCircle2 },
};

export default function RequestsPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/requests");
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (requestId: string) => {
    if (!session?.user?.id) {
      alert("請先登入");
      return;
    }

    try {
      const res = await fetch(`/api/requests/${requestId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });

      if (res.ok) {
        fetchRequests(); // Refresh
      }
    } catch (error) {
      console.error("Vote error:", error);
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (activeTab === "all") return true;
    return r.status.toLowerCase() === activeTab;
  });

  if (loading) {
    return <div className="container mx-auto px-4 py-12">載入中...</div>;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">請求板</h1>
            <p className="text-muted-foreground">提出工具需求，讓開發者幫你實現</p>
          </div>
          <Link href="/requests/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              新增請求
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{requests.filter(r => r.status === "OPEN").length}</div>
              <div className="text-sm text-muted-foreground">開放中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{requests.filter(r => r.status === "IN_PROGRESS").length}</div>
              <div className="text-sm text-muted-foreground">進行中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{requests.filter(r => r.status === "COMPLETED").length}</div>
              <div className="text-sm text-muted-foreground">已完成</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="open">開放中</TabsTrigger>
            <TabsTrigger value="in_progress">進行中</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredRequests.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">暫時沒有請求</h3>
                  <p className="text-muted-foreground mb-4">成為第一個提出需求嘅人！</p>
                  <Link href="/requests/new">
                    <Button>新增請求</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((request) => {
                const StatusConfig = statusConfig[request.status];
                return (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Vote Button */}
                        <button
                          onClick={() => handleVote(request.id)}
                          className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <ThumbsUp className="h-5 w-5" />
                          <span className="font-bold">{request.upvotes}</span>
                        </button>

                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={StatusConfig.color}>
                              <StatusConfig.icon className="h-3 w-3 mr-1" />
                              {StatusConfig.label}
                            </Badge>
                            {request.gradeLevels.map((grade) => (
                              <Badge key={grade} variant="outline">{grade}</Badge>
                            ))}
                          </div>

                          {/* Title */}
                          <h3 className="font-semibold text-lg mb-2">{request.titleZh}</h3>

                          {/* Description */}
                          <p className="text-muted-foreground mb-3">{request.descZh}</p>

                          {/* Meta */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {request.author.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {new Date(request.createdAt).toLocaleDateString("zh-HK")}
                            </span>
                          </div>

                          {/* Claimed By */}
                          {request.claimedBy && (
                            <div className="mt-3 text-sm">
                              <span className="text-muted-foreground">認領者：</span>
                              <span className="font-medium">{request.claimedBy.name}</span>
                            </div>
                          )}

                          {/* Completed Tool */}
                          {request.completedTool && (
                            <div className="mt-3">
                              <Link 
                                href={`/tools/${request.completedTool.slug}`}
                                className="text-sm text-primary hover:underline"
                              >
                                查看完成嘅工具 → {request.completedTool.titleZh}
                              </Link>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        {request.status === "OPEN" && session?.user && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={async () => {
                              await fetch(`/api/requests/${request.id}/claim`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ userId: session.user.id }),
                              });
                              fetchRequests();
                            }}
                          >
                            認領
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
