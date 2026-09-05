export interface Block {
	type: 'p' | 'quote' | 'list' | 'sub';
	text?: string;
	items?: string[];
}

export const guide = {
	title: 'How to Support the “Gabe” in Your Life When They’re Struggling with Depression: For Dummies.',
	subtitle:
		'A how-to guide on how to be supportive when someone in your life isn’t doing well.',
	version: 'Version 1.1',
	author: 'By Gabriel Prero',
};

export const intro: Block[] = [
	{
		type: 'p',
		text: 'Whenever I read a “How-To” guide, I’m naturally skeptical about the source of the material. So here’s a little bit about me, and why I chose to write this guide.',
	},
	{ type: 'p', text: 'I’ve been struggling with Depression for around 30 years.' },
	{
		type: 'p',
		text: 'Quick sidenote: I refer to the capital “D” Depression to separate it from the general mood of depression that everyone experiences during the human experience. Clinical Depression, or Major Depressive Disorder (MDD) is another animal, and is what I refer to here. MDD can be defined as “a mood disorder that causes a persistent feeling of sadness and loss of interest. […] it affects how you feel, think and behave and can lead to a variety of emotional and physical problems. You may have trouble doing normal day-to-day activities, and sometimes you may feel as if life isn’t worth living. More than just a bout of the blues, depression isn’t a weakness and you can’t simply ‘snap out’ of it. Depression may require long-term treatment.” — Mayo Clinic',
	},
	{
		type: 'p',
		text: 'The earliest episode I can recall was in about 4th grade, triggered by an instance where a good friend became my worst bully. I remember hiding under the wheel of a piece of construction equipment by the school at afternoon carpool, hoping it would run over me in the morning.',
	},
	{
		type: 'p',
		text: 'I was first diagnosed with Clinical Depression at 17, as a Senior in high school. During that struggle, I lost a number of friends. Others distanced themselves. Some became my greatest supporters and treasures. And the difference could largely be attributed to whether or not they knew (or at that age, had the instinct for) how to communicate with and support me during that time. After trying a mix of therapies, I and my parents made the decision to see a Psychiatrist, I began working with antidepressants, and continued to lead a relatively normal life.',
	},
	{
		type: 'p',
		text: 'Since then, Depression waves hit me on and off. Some episodes last days, some weeks. Sometimes I have years between episodes, sometimes just months. After my Dad died in 2009, the holiday season would routinely put me in a moderate 2-month episode. But it is usually a number of years between major Depressive episodes.',
	},
	{
		type: 'p',
		text: 'In 2019, during what was the worst crash I had since my initial Depression diagnosis in 2000, I was also diagnosed with an Anxiety Disorder. I began treatment with a Cognitive Behavioral Therapist, in addition to a new Psychiatrist for med management. To say this changed my life is an understatement. With the help of a new med regiment, CBT clicked with me. I was able to process, work through, and all but eliminate my persistent anxiety. This helped my Depression as well. My episodes tended to end sooner, not go as deep, and get farther apart. But as those who suffer from Depression know, they still happen.',
	},
	{
		type: 'p',
		text: 'This brings us to the summer of 2023. 4 months after losing a job, the last 6+ months of which were chronically stressful, filled with unknowns, misleading, and vagaries, I found myself in an episode darker than I’ve had in about 5 years. I was apathetic towards everything, including my own life. The skills I had built with CBT just weren’t enough to pull me out. They were enough to keep me “functioning” (in truth, I had probably been functioning through a major Depressive episode already for months), but could not keep the intrusive thoughts, cognitive distortions, ruminations and apathy from consuming my brain.',
	},
	{
		type: 'p',
		text: 'And once again, many friends and family have shown up in monumental fashion, others disappointing with their distance or poor responses. All the while, my wife and kids have been incredibly amazing.',
	},
	{
		type: 'p',
		text: 'At the suggestion of my Doctor and Therapist, I enrolled in a PHP/IOP program to immerse myself in building skills and fortifying my mental health (one of the benefits of unemployment is having newly found time on your hands). I called it “Depression Camp.” But it was actually more like school. Group therapists lead discussions on ACT, CBT, and DBT, mixed in with 1:1 and other group care. We even got recess! It was incredibly mentally and emotionally taxing. It forced me to think about the uncomfortable all day, and reframe and refocus how I think and process. And it was very effective.',
	},
	{
		type: 'p',
		text: 'A common thread I heard among my peers in this program, and one I feel myself, is that so many people find their Depression exacerbated by the fact that those people closest in their lives; to whom they are the most vulnerable; simply don’t know what to say or do. I know this pain very well. Be it family, colleagues, or close friends, there exists a cavernous and unfortunate knowledge gap between showing support for physical health vs. mental health. (This is an analogy I’ll use often, as it’s perhaps the simplest.) And the people that suffer the consequence of this gap the most are the ones that are already suffering. You cannot imagine the pain of your brain forcing you to feel sad, worthless, hopeless, unloveable, and on top of that your support network backing away. It’s painfully compounding.',
	},
	{
		type: 'p',
		text: 'So here are tips that may guide you to helping your friend or loved one and show support as they struggle with their mental health. Especially if they are anything like me.',
	},
];

export const note =
	'NOTE: I am not a mental health professional. All of these suggestions are based on my own personal experience as someone who struggles with mental health, and are things that help me. Hence the reason this guide is titled what it is. They are not necessarily true for everyone, but it’s likely a lot of them are. Basically, it’s better than nothing. And nothing is ever as good as simply asking “how can I support you?”';

export const disqualifier: Block[] = [
	{
		type: 'p',
		text: 'I will also note one other thing, which I will circle back to later. Throughout living with Depression for 30 years, I have been able to finish High School and College, build and maintain a wonderful marriage of 17 years, raise 4 amazing children, own a home, navigate a niche career and climb the corporate ladder, raise millions of dollars for charity organizations, be on the board or committees of a number of community institutions or events, complete 4 half-marathons and dozens of other races, secure nearly 20 patents, travel all over the world, have many wonderful and meaningful friends and human interactions, and achieve richness, fulfillment, and personal growth I would not have imagined. I don’t say this to brag, I say this to illustrate a single point:',
	},
	{ type: 'quote', text: 'Living with Depression is not a disqualifier.' },
	{
		type: 'p',
		text: 'Much like living with High Blood Pressure or Diabetes. It may cause problems once in a while, but it does not mean we are broken, irrational, or incapable of wisdom, smart decisions, or wonderful relationships.',
	},
	{ type: 'p', text: 'Ok, now on with the guide.' },
];

export interface Tip {
	title: string;
	blocks: Block[];
}

export const tips: Tip[] = [
	{
		title: 'Cover the Essentials',
		blocks: [
			{
				type: 'p',
				text: 'We gotta get this one out of the way. Ascertain if the person in question is under the care of a mental health professional. If they are not, encourage them to be. And if they are in danger of hurting themselves, making sure they are safe is priority #1. All the rest of these tips assume that they are under that care, they are safe at this moment, and that their care providers are up to date on their current situation. Just as you’d advise or ask someone with physical symptoms “did you see a doctor?” This is no different.',
			},
			{ type: 'p', text: 'Here’s the “but” to #1: support doesn’t end there. Now keep reading.' },
		],
	},
	{
		title: 'You Don’t Need Credentials. You Don’t Need Solutions.',
		blocks: [
			{
				type: 'p',
				text: 'When we need support, we need more than our doctors. We need more than our partners. We sometimes need everyone. But we don’t need them to all be the same thing. Think of someone going through cancer. If they call you for help, they are not asking you for chemo. If they have a broken bone, they are not asking you to set it. They want an ear; validation; empathy; compassion; a hug. Maybe just silent company; to not feel alone. Express care, love, and your desire for us to be around.',
			},
			{
				type: 'p',
				text: 'To reframe this, because it’s one of the biggest mistakes people make: you don’t need to “solve” the problem. People often feel “I’m not a psychologist, I’m not equipped to help here.” You don’t need to solve anything. You are equipped with ears, and a heart. That’s all you really need.',
			},
			{
				type: 'p',
				text: 'If your cancer suffering friend called, you wouldn’t say “I don’t know cancer treatments and am not an oncologist so don’t talk to me, I can’t help.”',
			},
		],
	},
	{
		title: 'Shut up and Listen.',
		blocks: [
			{ type: 'p', text: 'So what do you do instead if you’re not trying to fix it? Listen.' },
			{
				type: 'p',
				text: 'Hear it all. Let us talk until we are exhausted. Ask questions about how we’re feeling. Ask follow up questions. And be ok with a non-answer. Or with a loop of thought. Or with silence. Be with us, for us. What we say doesn’t have to make sense. It might not. It might not even make sense to us. Just hear it.',
			},
		],
	},
	{
		title: 'When it’s Time for You to Talk.',
		blocks: [
			{
				type: 'p',
				text: 'Ok, so you’ve heard it, and now there’s a pause. We look at you with tearful eyes, we take that long breath, that long sigh, there’s a gap of noise on the phone call. So now what do you do? Say:',
			},
			{
				type: 'list',
				items: [
					'“I’m sorry; that’s really hard.”',
					'“I’m here for you.”',
					'“I love you.”',
					'“How does that make you feel?”',
				],
			},
			{
				type: 'p',
				text: 'Know that not everything will make sense. Know that not everything will be rational, or even nice. There’s a good reason for that; part of the brain isn’t working right. So don’t get offended. Just keep the niceties flowing.',
			},
		],
	},
	{
		title: 'Don’t Argue with the “Feelings”. Validate Us.',
		blocks: [
			{
				type: 'p',
				text: 'Don’t invalidate our specific feelings or emotions while we are struggling and we are discussing with you. We may feel hurt, lost, useless, rejected, unloved, angry, etc. And you might feel that we have no rational reason to feel that way, given the evidence. But that does not stop the emotions or feelings. And we are allowed to feel them in the moment. We can’t stop the thoughts and feelings, and they are therefore valid, because that’s what our brain is saying to us in that moment. They still exist. Even if they may not make sense to you, or if you disagree, or if you remember differently. Because we are talking thoughts and feelings and emotions. Not facts. You cannot argue with what is in our brains.',
			},
			{
				type: 'p',
				text: 'Now feel free to bolster us (e.g. if we say “I’m worthless; no one cares,” you can say “that’s not true; I value you. Here’s what I value about you. And I care. This is why I care.”). But validate our feelings.',
			},
			{
				type: 'list',
				items: [
					'“I understand why you feel alone.”',
					'“I see how that can make you feel angry.”',
					'“It’s ok to feel hurt.”',
				],
			},
			{
				type: 'p',
				text: 'It’s not about you, it’s about us. Be there for us. Tell us why we are awesome. Express you care. Express that you love us, and want us in your life.',
			},
		],
	},
	{
		title: 'Be Personal.',
		blocks: [
			{
				type: 'p',
				text: 'I emphasize “you” because the personal aspect is so important to helping “disprove” the cognitive distortions in our head.',
			},
			{
				type: 'p',
				text: 'You may feel inclined to say generalities like “your family needs you”, “everyone cares about you,” or “so many people need you.” Avoid those generalities. For one, in our heads, we’re saying “bullshit.” But more than that, we reached out to you. We are talking to you. Because we are vulnerable to you and how you feel matters. So suck it up and be sappy and show some personalized love that can only come from you. Show that it’s coming from your specific heart. And then, maybe, we might start to believe you.',
			},
			{
				type: 'p',
				text: 'And if we shrug off your kind words and validation, don’t take it personally. Don’t engage in an argument with us about it. We’re probably gonna come up with all these reasons why you’re wrong so we can reinforce our negative belief. Just say “I know you might not believe what I’m saying right now, but it’s true. And I’ll believe it for you.”',
			},
			{
				type: 'p',
				text: 'The important part is you said it. And we heard it. And at some point, that will resonate with us.',
			},
		],
	},
	{
		title: 'Be Proactive.',
		blocks: [
			{
				type: 'p',
				text: 'Show up, and be proactive doing so. If you say “call me if you need me,” we’re not gonna call. If we have to crawl out of our dark hole and face the immense guilt and shame our brain is hammering us with to ask for your help, it’s probably not gonna happen. And/or by the time it does, we’re probably already in a pretty bad state.',
			},
			{
				type: 'p',
				text: 'When experiencing Deep Depression, we are often in such a deep fog that we cannot articulate what our needs are. So make the first move. Show up to our place, and be ok if we turn you away. If you’re too far away to do that, make the phone call. And be ok if we don’t answer. But don’t let that dissuade you off from trying again, unless we specifically direct you not to. (Pro tip: “Go away” is not a specific directive. Try again.) Keep showing up. Keep calling.',
			},
			{
				type: 'p',
				text: 'Pro tip: Try offering a choice of 3 ways to offer support, so they can choose from your menu, while also gently forcing them into accepting some form of support.',
			},
			{
				type: 'list',
				items: [
					'“Do you wanna grab coffee, hang at my place, or should I come to you?”',
					'“Do you want me to just listen, and I can come over and hang, or do you want me to distract you and we can go bowling or run some errands? Or maybe I can send you some takeout and we can watch the same thing on Netflix from our own places while on the phone?”',
				],
			},
			{ type: 'p', text: 'We will generally want one of 3 things from our broader support network:' },
			{
				type: 'list',
				items: [
					'To vent without judgement or “fixes” and just be heard and validated.',
					'To be temporarily distracted and pulled out of the stress for a moment.',
					'To just have the feeling that we are loved and cared for.',
				],
			},
			{ type: 'p', text: 'Try offering some of these options in a specific way, and you’ll probably get a hit.' },
		],
	},
	{
		title: 'Avoid Texting, or Do So with Caution.',
		blocks: [
			{
				type: 'p',
				text: 'As someone who has social anxiety, I like texting, but when dealing with matters of emotion, it really is just about the poorest form of communication. That doesn’t mean it can’t have a place and still offer some support when we need it.',
			},
			{
				type: 'p',
				text: 'If you want to express care and support but maybe don’t have the emotional/mental capacity to listen, you can still do so with a text. Conversely, if you’ve been having the regular conversations but want to do a quick check in and give us a little boost, some simple messages can serve that purpose nicely.',
			},
			{
				type: 'list',
				items: [
					'“Hey, I’m thinking of you.”',
					'“Hoping today goes well for you!”',
					'“You’ll do great today!”',
					'“Just want you to know I’m here with you.”',
				],
			},
			{
				type: 'p',
				text: 'Better to leave these as single line well-wishes. Don’t ask questions, just make the expression of care.',
			},
			{
				type: 'p',
				text: 'But if you want to have the conversation, pick up the phone. Schedule the Zoom call. Be proactive. It’s very hard for us to eloquently talk about the thoughts tormenting our heads over text while still retaining some semblance of apparent sanity. We also may not want to see it all written out. It can be scary for both of us.',
			},
			{
				type: 'p',
				text: 'On top of that, tone and affectation of our voice, and yours, becomes infinitely more vital in support communication. We will easily misread, or read too far into, text messages. The lack of an “!” or the wrong emoji can send us down a surprisingly deep rabbit hole. So swallow the frog. Pick up the phone. Make the call. Yes, it’ll be uncomfortable. But you have no idea what it does for us.',
			},
			{
				type: 'p',
				text: 'You also might be surprised how “normal” or casual, or even funny, we might sound. In text, you might presume we are all dark and emo, but over the phone, you’ll hear us. No assumptions added.',
			},
			{ type: 'p', text: 'And if the spontaneous call or show-up doesn’t work for you, try to schedule one.' },
			{
				type: 'list',
				items: [
					'“Hey, when can I take you for coffee?”',
					'“When’s a good time to call you?”',
					'“Can I call you at 3?”',
				],
			},
			{
				type: 'p',
				text: 'It’s important to be just a tad pushy here. We will often reject soft or passive attempts to help us or get together with us, so keep the ball in your court. Prove to us we matter to you.',
			},
		],
	},
	{
		title: 'Social Media Lies. Especially When We Are Struggling.',
		blocks: [
			{
				type: 'p',
				text: 'NEVER rely on social media to give you an accurate depiction of how we are doing. I mean, that’s honestly the case with everyone. It’s a highlight reel after all. Single fleeting moments in time, feelings, thoughts, captured like a polaroid forever after in the web of the internets. But especially with someone who deals with rumination, cognitive distortions, and intrusive thoughts, there are so many things going into why and what we might be posting or sharing that it’s best to just throw it all away and not take ANY of it into consideration.',
			},
			{
				type: 'p',
				text: '“Oh, he’s smiling and having fun in those pictures with his friends, he must be doing great.” But then you don’t see us crash immediately after and cry ourselves to sleep. “He’s posting all these dark and depressing memes and quotes, this is scary I should leave him alone.” But you don’t see he’s also sharing dogs running into walls, poop memes, and Dad jokes with friends too.',
			},
			{
				type: 'p',
				text: 'So yeah, take social media with an even bigger heap of salt than you should with any neurotypical person.',
			},
		],
	},
	{
		title: 'You’re Not Our Doctor; Don’t Pretend to Be*.',
		blocks: [
			{
				type: 'p',
				text: 'Many people are natural fixers. You want to jump to help, you want to fix what’s broken. When you hear a problem, yo, you’ll solve it (sorry for the Vanilla Ice reference). But this points back to the converse of Tip #1. Don’t start “prescribing” treatment or fixes.',
			},
			{
				type: 'p',
				text: '“Go for a walk; just think about something else; you just need to keep busy; go to the gym; you’ve got nothing to be sad about.” While some of those things may actually work, we likely already know that. And they either ain’t working or we ain’t about to try it right now. Again: we are looking for validation, empathy, compassion, and love. We likely know what the fixes are, and they will come from within ourselves or our professional support team. If I wanted to go for a walk, I wouldn’t be reaching out to you right now. So stick to the listening.',
			},
			{
				type: 'p',
				text: 'There is a caveat to this, hence the “*”: if you are part of our “inner circle”, and know that you are one of the people we lean on for active help and motivation (that might be a partner/spouse, parent, close relative, or super close friend), and you are willing/eager to accept a more “active” role in helping us, then it is ok and encouraged to motivate us to use the tools that help us, when you know what those tools are and know that they indeed help us.',
			},
			{
				type: 'p',
				text: 'For example, my circle knows that meditation often helps me, as does environment change. If you are in my inner circle, it’s ok to say “hey, did you try meditating today? Maybe walk outside on the back porch, breathe some fresh air.”',
			},
			{
				type: 'p',
				text: 'Take note: This inner circle is sooo critical to our support. While we may be open with a lot of people, and may seek comfort from some people, there are very few from whom we will seek or accept active support and motivation.',
			},
			{
				type: 'p',
				text: 'If we identify you as one of those people, but you feel it is beyond your boundaries to accept that role, please be upfront and clear about that, and in the kindest way possible (best to present that at a time when we are a bit more level and calm, and do so in person). If we identify you as one of those people and you are a willing participant, first of all, you are one of the most special, thoughtful, caring, and wonderful people on this earth. Those of us struggling with mental health have very very few who honestly know us at our worst and are still there for us, love us, and treat us normally. As part of this inner circle, you hold a piece of our heart, and likely always will. We trust you completely, and are totally vulnerable to you. Yes, this sounds like a lot, but also know that in return you are gaining us as a staunch ally, advocate, and someone who would probably take a bullet for you.',
			},
			{
				type: 'p',
				text: 'The inner circle gets some leeway with the “tips,” but also know that we are most vulnerable to you. Hold our hearts carefully please. Your words and actions have more impact on us than anyone else. They can hurt more than anyone, but they can also help more than anyone.',
			},
		],
	},
	{
		title: 'We are Normal. Be Normal Too.',
		blocks: [
			{
				type: 'p',
				text: 'Be normal. Converse normally. We are not “Depression”; we are struggling with Depression.',
			},
			{
				type: 'p',
				text: 'Again, I like to substitute “Depression” with a physical ailment, like a broken leg. The person isn’t a broken leg, they are suffering from one. They are still the same person. And depending on when you get us, we may still joke, be silly, or casual. And on the other hand, you may get a glimpse of the depth of the illness we are experiencing. But we are the same person. We aren’t “crazy,” we aren’t “broken.” Much of our person, body, and brain are still functioning perfectly normally. Just be yourself. Just be normal. And let judgment fall away.',
			},
			{
				type: 'p',
				text: 'The above is also why I say to avoid text and pick up the phone. You might be overwhelmed with the notion “my friend/relative is struggling with mental health, so I need to walk on eggshells and be super sad and serious and tentative.” While yes, you should be mindful of what you say and do (hence this guide), you may be surprised to hear how matter-of-factly we can talk about what’s going on. And even joke about it. We may even tolerate jokes from you too. Just like someone with a broken leg might. But you can’t really tell that from a text.',
			},
		],
	},
	{
		title: 'Be Honest and Be There. That’s What is Most Important.',
		blocks: [
			{
				type: 'p',
				text: 'If after all this, you really can’t figure out what to say, then say just that.',
			},
			{
				type: 'p',
				text: 'I was struggling with Depression and had to take a couple days off of work once. The best reply I got from someone who didn’t understand what to do came from my boss at the time. He said, “I’ll be honest: I don’t know what you’re going through and don’t know what to say or how to help. So tell me what to do or say or how I can help and I’ll do the best I can. I’m here for you.” And that’s the perfect thing to say.',
			},
			{
				type: 'p',
				text: 'There’s no need for guesswork. Just ask. We may not have an answer, so that’s when you can try some of the above suggestions. But if all else fails, the fact that you expressed you care and that you don’t know what to say at least gives us clarity. We know you care, we know you want to help, and we know you don’t know how. That’s better than someone guessing what to do and getting it wrong and now we think they don’t care or are being mean or distant on purpose. We obsess over every little implication and thing said and unsaid from those around us. Getting clarity about how people feel is unfortunately very rare for us when we are suffering.',
			},
		],
	},
];

export const outro: Block[] = [
	{
		type: 'p',
		text: 'Once again, this is not a guide to treating Depression. None of the things here will cure Depression, or even make it better. That still requires a balance of treatments. But these tips can help guide you to communicating with and giving support to your loved one when they are struggling with the throws of a Depressive episode. And if you want to discuss your friend or loved one’s situation with another party to seek advice, I’d suggest asking your suffering friend in question their comfort level. I cannot speak on others behalf in that regard. Better not to assume.',
	},
	{
		type: 'p',
		text: 'So if you are a fellow sufferer, know that you are not alone, and don’t need to be. Share this with your potential support network to help you say what is difficult for you to say. Know that this episode won’t last forever, and effective and meaningful support is out there and attainable. Feel empowered to advocate for yourself.',
	},
	{
		type: 'p',
		text: 'If you are a member of a sufferer’s support network, I urge you to re-read this, share it and extend the support you can to the best of your ability. It is priceless. Normalize that mental health care is health care. And also remember, that this episode will not last forever. Your friend or loved one is still capable of leading a rich and fulfilling life. Much like the cast on a broken leg, this will impair us for a while, but we’ll be back to ourselves again soon. Making Dad jokes, sending dog videos, and sharing poop memes.',
	},
];
