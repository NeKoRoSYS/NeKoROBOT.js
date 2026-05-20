import { SlashCommandBuilder } from 'discord.js';
import { ChatCommand } from '../../types/discord';
import { BackendAction, BackendEvent, BaseRequest, CrudResponse } from '../../types/backend';
import { BackendService } from '../../services/BackendService';

const command: ChatCommand = {
    data: new SlashCommandBuilder()
        .setName('deleteaccount')
        .setDescription('Permanently delete your profile from the database'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        
        const payload: BaseRequest = {
            action: BackendAction.DELETE,
            interaction_id: interaction.id,
            discord_id: interaction.user.id
        };

        try {
            await BackendService.getInstance().execute<CrudResponse>(payload as any, BackendEvent.DELETED);
            await interaction.editReply({ 
                content: 'Your account and all associated data have been successfully deleted.' 
            });
        } catch (err: any) {
            await interaction.editReply({ 
                content: `Deletion failed: ${err.message || 'Are you sure you have an account?'}` 
            });
        }
    }
};

export default command;