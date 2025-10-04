// train_gingerai.js
// GingerAI: multilingual, smart sentences, API-ready fallback

window.GingerAI = (function() {
    const triggers = [
        { keywords: ["hi","hello","hey"], response: "Hello! How can I help you today?" },
        { keywords: ["hallo","hoi"], response: "Hoi! Hoe gaat het?" },
        { keywords: ["wat","what"], response: "Kun je dat iets specifieker uitleggen?" },
        { keywords: ["bye","tot ziens","goodbye"], response: "Goodbye! Talk to you soon." },
        { keywords: ["thanks","dank"], response: "You're welcome!" },
        { keywords: ["help","help me","help please","help me please"], response: "Sure! Ask me anything and I'll try to help." },
        { keywords: ["name"], response: "I'm GingerAI, your friendly assistant!" },
        { keywords: ["weather","weer"], response: "I can give basic info, or fetch live data if APIs are connected." },
        { keywords: ["game","games","spel"], response: "I love talking about games! What game do you like?" },
        { keywords: ["music","muziek"], response: "Music is life! Who's your favorite artist?" },
        { keywords: ["school"], response: "School can be tough. Need advice?" },
        { keywords: ["movie","film"], response: "I can recommend movies. Which genre do you like?" },
        { keywords: ["sports","sport"], response: "Sports keep us active! Which sport are you into?" },
        { keywords: ["love","dating","liefde"], response: "Love is complicated! What's on your mind?" },
        { keywords: ["travel","reizen"], response: "Traveling is amazing. Where would you like to go?" },
        { keywords: ["pets","dieren"], response: "I love pets! Do you have any?" },
        { keywords: ["books","boeken"], response: "Books open new worlds. What do you like to read?" }
    ];

    function detectLanguage(text) {
        const nlKeywords = ["hallo","hoi","wat","dank","goed","leuk","spel","film","boeken"];
        const enKeywords = ["hello","hi","what","thanks","good","nice","game","movie","books"];
        const txt = text.toLowerCase();
        let nlScore = 0, enScore = 0;
        nlKeywords.forEach(k => { if(txt.includes(k)) nlScore++; });
        enKeywords.forEach(k => { if(txt.includes(k)) enScore++; });
        if(nlScore > enScore) return "nl";
        if(enScore > nlScore) return "en";
        return "en";
    }

    function smartResponse(text) {
        const lang = detectLanguage(text);
        for(const t of triggers){
            for(const kw of t.keywords){
                if(text.toLowerCase().includes(kw)){
                    return t.response;
                }
            }
        }
        return lang === "nl" ? "Sorry, ik weet daar nog niet op te reageren." : "Sorry, I don't know how to respond to that yet.";
    }

    async function fetchFact(query) {
        try {
            const res = await fetch(`https://api.example.com/fact?q=${encodeURIComponent(query)}`);
            if(!res.ok) return null;
            const data = await res.json();
            return data.fact || null;
        } catch(e) {
            return null;
        }
    }

    return {
        ask: async function(message) {
            const fact = await fetchFact(message);
            if(fact) return fact;
            return smartResponse(message);
        }
    };
})();
