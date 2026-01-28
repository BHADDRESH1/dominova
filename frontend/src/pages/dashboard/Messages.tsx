
import { useState } from "react";
import { Send, Search, Phone, Video, MoreVertical, User, FileText } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data removed. Future: Integrate with a real-time chat service
const CONTACTS: any[] = []; // No backend table for messages yet
const MESSAGES: any[] = [];

import { useSearchParams } from "react-router-dom";

const Messages = () => {
    const [searchParams] = useSearchParams();
    const roleFromUrl = searchParams.get("role");
    const userRole = roleFromUrl || localStorage.getItem("userRole") || "owner";
    const [activeContact, setActiveContact] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        setMessages([
            ...messages,
            {
                id: messages.length + 1,
                senderId: 0, // Me
                text: inputMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isMe: true
            }
        ]);
        setInputMessage("");
    };

    return (
        <DashboardLayout role={userRole as any}>
            <div className="h-[calc(100vh-8rem)] flex flex-col">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-foreground">Messages</h1>
                    <p className="text-muted-foreground mt-1">Chat application for internal communication</p>
                </div>

                <Card className="flex-1 flex overflow-hidden border">
                    {/* Sidebar */}
                    <div className="w-80 border-r border-border flex flex-col bg-muted/20">
                        <div className="p-4 border-b border-border">
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input placeholder="Search messages..." className="pl-8 bg-background" />
                            </div>
                        </div>
                        <ScrollArea className="flex-1">
                            {CONTACTS.length === 0 ? (
                                <div className="p-4 text-center text-muted-foreground">
                                    No contacts found
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    {CONTACTS.map((contact) => (
                                        <button
                                            key={contact.id}
                                            onClick={() => setActiveContact(contact)}
                                            className={cn(
                                                "flex items-start gap-3 p-4 text-left transition-colors hover:bg-accent/50",
                                                activeContact?.id === contact.id ? "bg-accent/50" : ""
                                            )}
                                        >
                                            <Avatar>
                                                <AvatarFallback>{contact.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 overflow-hidden">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-semibold text-sm">{contact.name}</span>
                                                    <span className="text-xs text-muted-foreground">{contact.time}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                                            </div>
                                            {contact.unread > 0 && (
                                                <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                                                    {contact.unread}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col bg-background">
                        {/* Header */}
                        {activeContact ? (
                            <div className="p-4 border-b border-border flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{activeContact.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-sm">{activeContact.name}</h3>
                                        <p className="text-xs text-muted-foreground">{activeContact.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Video className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 border-b border-border flex items-center justify-center h-16">
                                <p className="text-muted-foreground">Select a contact to start chatting</p>
                            </div>
                        )}

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4">
                            {!activeContact ? (
                                <div className="h-full flex items-center justify-center text-muted-foreground">
                                    <p>No chat selected</p>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-muted-foreground">
                                    <p>No messages yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={cn(
                                                "flex gap-2 max-w-[80%]",
                                                msg.isMe ? "ml-auto flex-row-reverse" : ""
                                            )}
                                        >
                                            <div className={cn(
                                                "p-3 rounded-2xl text-sm",
                                                msg.isMe
                                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                    : "bg-muted rounded-tl-sm"
                                            )}>
                                                <p>{msg.text}</p>
                                                <p className={cn(
                                                    "text-[10px] mt-1 text-right",
                                                    msg.isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                                                )}>{msg.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-background">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <Button type="button" variant="ghost" size="icon">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                </Button>
                                <Input
                                    placeholder="Type a message..."
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    className="flex-1"
                                    disabled={!activeContact}
                                />
                                <Button type="submit" size="icon" disabled={!inputMessage.trim() || !activeContact}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Messages;
