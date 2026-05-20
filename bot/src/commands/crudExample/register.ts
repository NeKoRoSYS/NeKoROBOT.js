import { SlashCommandBuilder } from 'discord.js';
import { ChatCommand } from '../../types/discord';
import { BackendAction, BackendEvent, BaseRequest, CrudResponse } from '../../types/backend';
import { BackendService } from '../../services/BackendService';

interface CreateRequest extends BaseRequest {
    username: string;
    bio?: string;
}

const command: ChatCommand = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register a new profile in the database')
        .addStringOption(opt => 
            opt.setName('username')
               .setDescription('Your desired username')
               .setRequired(true)
        )
        .addStringOption(opt => 
            opt.setName('bio')
               .setDescription('A short bio about yourself')
               .setRequired(false)
        ),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        
        const payload: CreateRequest = {
            action: BackendAction.CREATE,
            interaction_id: interaction.id,
            discord_id: interaction.user.id,
            username: interaction.options.getString('username', true),
            bio: interaction.options.getString('bio') || "Hello World!"
        };

        try {
            await BackendService.getInstance().execute<CrudResponse>(payload as any, BackendEvent.CREATED);
            await interaction.editReply({ 
                content: 'Successfully registered! You can now use `/profile` to view your data or `/setbio` to update it.' 
            });
        } catch (err: any) {
            await interaction.editReply({ content: `Registration failed: ${err.message}` });
        }
    }
};

export default command;