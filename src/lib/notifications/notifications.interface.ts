export enum NotificationType {
  TELEGRAM = 'telegram',
}

type MessageMetadata = Record<string, any>;

interface BaseMessageWithBody {
  metadata: MessageMetadata;
}

// Open to extend
type BaseMessage = BaseMessageWithBody;

export type TelegramMessage = BaseMessage & {
  type: NotificationType.TELEGRAM;
  chatId: string;
};

export type NotificationServiceMessage = TelegramMessage;
