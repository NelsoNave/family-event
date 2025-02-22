import { PrismaClient, Prisma} from "@prisma/client";

const prisma = new PrismaClient()

//insert to event_participants
const addNewEventParticipant = async (tx: Prisma.TransactionClient, newEventId: number, newUserId: number, newMessage: string, newIsAccepted: boolean, newUserFamilyId?: number) => {
    const addedEventParticipant = await prisma.eventParticipants.create({
        data: {
        eventId: newEventId,
        userId: newUserId,
        userFamilyId: newUserFamilyId? newUserFamilyId: null,
        messageToHost:newMessage,
        isAccepted: newIsAccepted,
        isAttended: false

        },
    });
return addedEventParticipant
}

export default {
    addNewEventParticipant,
}
