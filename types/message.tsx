// export type Message = { 
//     id: number;
//     text: string;
//     sender: "user" | "bot";
//     timestamp: string;
//   }


export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  children?: { id: number; contenu: string }[]; // Ajout de la propriété children
}