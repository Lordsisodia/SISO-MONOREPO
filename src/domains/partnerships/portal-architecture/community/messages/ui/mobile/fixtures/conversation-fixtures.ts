export type ConversationMessage = {
  id: string;
  authorName: string;
  authorInitials: string;
  content: string;
  timestamp: string;
  sentAt?: string;
  direction: "incoming" | "outgoing";
};

export const mockConversation: ConversationMessage[] = [
  {
    id: "msg-1",
    authorName: "SISO Agency",
    authorInitials: "SA",
    content: "Hey team! Dropping the latest campaign numbers — 18% uptick in lead conversions week-over-week.",
    timestamp: "Yesterday • 9:41 PM",
    sentAt: "2025-11-13T21:41:00.000Z",
    direction: "incoming",
  },
  {
    id: "msg-2",
    authorName: "You",
    authorInitials: "YC",
    content: "Massive! Let’s queue the partner follow-up sequence and prep the case-study drip.",
    timestamp: "Yesterday • 9:42 PM",
    sentAt: "2025-11-13T21:42:00.000Z",
    direction: "outgoing",
  },
  {
    id: "msg-3",
    authorName: "SISO Agency",
    authorInitials: "SA",
    content: "Already pushing the templates live—share any blockers and I’ll clear them.",
    timestamp: "Today • 7:12 AM",
    sentAt: "2025-11-14T07:12:00.000Z",
    direction: "incoming",
  },
];
