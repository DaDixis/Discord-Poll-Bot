const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll'),

    async execute(interaction) {
        if (interaction.user.id !== config.ownerId) {
            await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            return;
        }

        const modal = new ModalBuilder()
            .setCustomId('pollModal')
            .setTitle('Create a Poll');

        const topicInput = new TextInputBuilder()
            .setCustomId('topicInput')
            .setLabel('Poll Topic')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('descriptionInput')
            .setLabel('Poll Description')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false);

        const actionRow1 = new ActionRowBuilder().addComponents(topicInput);
        const actionRow2 = new ActionRowBuilder().addComponents(descriptionInput);

        modal.addComponents(actionRow1, actionRow2);

        await interaction.showModal(modal);
    },
};