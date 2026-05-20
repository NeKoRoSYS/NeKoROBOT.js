import { SlashCommandBuilder, MessageFlags, EmbedBuilder } from 'discord.js';
import { ChatCommand } from '../../types/discord';
import { BackendAction, BackendEvent, BaseRequest, CrudResponse } from '../../types/backend';
import { BackendService } from '../../services/BackendService';

const command: ChatCommand = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Read your database profile'),
    async execute(interaction) {
        await interaction.deferReply();
        
        const payload: BaseRequest = {
            action: BackendAction.READ,
            interaction_id: interaction.id,
            discord_id: interaction.user.id
        };

        try {
            const data = await BackendService.getInstance().execute<CrudResponse>(payload, BackendEvent.READ);
            
            const embed = new EmbedBuilder()
                .setTitle(`${data.data?.username}'s Profile`)
                .setDescription(`**Bio:** ${data.data?.bio}`)
                .setColor('Blue');

            await interaction.editReply({ embeds: [embed] });
        } catch (err: any) {
            await interaction.editReply({ content: err.message });
        }
    }
};
export default command;