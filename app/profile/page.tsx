"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, School, Wrench, Heart, ClipboardList } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">載入中...</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">個人檔案</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {user.image ? (
                      <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full" />
                    ) : (
                      <User className="w-12 h-12 text-primary" />
                    )}
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="mt-2 px-3 py-1 bg-primary/10 rounded-full text-sm text-primary">
                    {user.role === "TEACHER" ? "教師" : user.role}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link
                    href="/my-tools"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <Wrench className="h-5 w-5 text-muted-foreground" />
                    <span>我的工具</span>
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <Heart className="h-5 w-5 text-muted-foreground" />
                    <span>我的收藏</span>
                  </Link>
                  <Link
                    href="/my-requests"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <ClipboardList className="h-5 w-5 text-muted-foreground" />
                    <span>我的請求</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>基本資料</CardTitle>
                <CardDescription>更新你的個人資料</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="name" defaultValue={user.name || ""} className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">電郵地址</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" defaultValue={user.email || ""} className="pl-10" disabled />
                  </div>
                  <p className="text-xs text-muted-foreground">電郵地址不可更改</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">學校</Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="school" placeholder="你的學校" className="pl-10" />
                  </div>
                </div>

                <Button>保存更改</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>統計數據</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">上載工具</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">收藏</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">請求</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
