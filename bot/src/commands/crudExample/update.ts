import { SlashCommandBuilder } from 'discord.js';
import { ChatCommand } from '../../types/discord';
import { BackendAction, BackendEvent, BaseRequest, CrudResponse } from '../../types/backend';
import { BackendService } from '../../services/BackendService';

const command: ChatCommand = {
    data: new SlashCommandBuilder()
        .setName('setbio')
        .setDescription('Update your profile bio')
        .addStringOption(opt => opt.setName('bio').setDescription('New bio').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        
        const payload = {
            action: BackendAction.UPDATE,
            interaction_id: interaction.id,
            discord_id: interaction.user.id,
            bio: interaction.options.getString('bio', true)
        };

        try {
            await BackendService.getInstance().execute<CrudResponse>(payload as any, BackendEvent.UPDATED);
            await interaction.editReply({ content: 'Bio successfully updated!' });
        } catch (err: any) {
            await interaction.editReply({ content: err.message });
        }
    }
};
export default command;