// cmds/geddit.js

const { EmbedBuilder, ColorResolvable } = require('discord.js');
const got = require('got');

// Function to generate a random hex color code
function randomHexColor() {
    // Generate a sudo random number between 0 and 16777215 (0xFFFFFF)
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // Pad the color code with zeros if it's shorter than six characters
    return '#' + '0'.repeat(6 - randomColor.length) + randomColor;
}


module.exports = {
    help: {
        name: 'geddit',
        description: 'Fetches a random post from a specified subreddit. Can display memes, images, or videos.',
        usage: '!geddit <subreddit>',
        category: 'Fun'
    },
    async run(c, msg, args) {
        try {
            // Check if subreddit is provided
            if (!args.length) {
                return msg.reply('Please provide a subreddit!');
            }

            // Snag a random post from subreddit
            const subreddit = args[0].toLowerCase();
            const response = await got(`https://www.reddit.com/r/${subreddit}/random/.json`);

            // Parse response
            const data = JSON.parse(response.body);

            // Check if response contains any posts
            if (!data || !data[0] || !data[0].data || !data[0].data.children || !data[0].data.children.length) {
                return msg.reply(`No posts found in subreddit: ${subreddit}`);
            }

            // Get a random post
            const post = data[0].data.children[0].data;

            // Create embed builder
            const embedBuilder = new EmbedBuilder();

            // Check if the post is a video
            if (post.is_video) {
                embedBuilder.setDescription('📹 This post contains a video. [Click here to watch it!](' + post.url + ')');
            } else {
                // If it's an image or other media, set the media property
                embedBuilder.setImage(post.url);
            }

            const embed = embedBuilder
                .setColor(randomHexColor())
                .setTitle(post.title)
                .setURL(`https://www.reddit.com${post.permalink}`) // Remove semicolon here
                .setFooter({ text: `👍 ${post.ups} | 💬 ${post.num_comments}` }); // Continue chaining

            // Send the embed
            msg.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            msg.reply('An error occurred while fetching the post.');
        }
    }
};
