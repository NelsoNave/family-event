import {
  ClipboardList,
  Images,
  ListCheck,
  LucideIcon,
  MessagesSquare,
  Plus,
  ShoppingCart,
  Timer,
  UsersRound,
} from "lucide-react";

const MENU_LIST_COMMON = [
  {
    iconName: "Necessity",
    backgroundColor: "primary/20",
    iconColor: "primary",
    path: "necessities",
  },
  {
    iconName: "Timeline",
    backgroundColor: "accentGreen/20",
    iconColor: "accentGreen",
    path: "timeline",
  },
  {
    iconName: "Album",
    backgroundColor: "accentBlue/20",
    iconColor: "accentBlue",
    path: "album",
  },
  {
    iconName: "Talk",
    backgroundColor: "accentPurple/20",
    iconColor: "accentPurple",
    path: "announcements",
  },
];

export const MENU_LIST_HOST = [
  ...MENU_LIST_COMMON,
  {
    iconName: "Budget",
    backgroundColor: "accentGreen/20",
    iconColor: "accentGreen",
    path: "to-buy",
  },
  {
    iconName: "Guest list",
    backgroundColor: "accentPurple/20",
    iconColor: "accentPurple",
    path: "guests",
  },
  {
    iconName: "RSVP",
    backgroundColor: "primary/20",
    iconColor: "primary",
    path: "rsvp/responses",
  },
];

export const MENU_LIST_GUEST = [...MENU_LIST_COMMON];

export const ICON_MAP: Record<string, LucideIcon> = {
  Necessity: ListCheck,
  Timeline: Timer,
  Album: Images,
  Talk: MessagesSquare,
  Budget: ShoppingCart,
  "Guest list": UsersRound,
  RSVP: ClipboardList,
};

export const DEFAULT_ICON = Plus;
