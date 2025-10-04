window.GingerAI = (function() {
    const triggers = [
        { keywords: ["hi","hello","hey"], response: "Hello! How can I help you today?" },
        { keywords: ["hallo","hoi"], response: "Hoi! Hoe gaat het?" },
        { keywords: ["wat","what"], response: "Kun je dat iets specifieker uitleggen?" },
        { keywords: ["bye","tot ziens","goodbye"], response: "Goodbye! Talk to you soon." },
        { keywords: ["thanks","dank"], response: "You're welcome!" }
    ];

    function detectLanguage(text) {
        const nlKeywords = ["hallo","hoi","wat","dank"];
        const enKeywords = ["hello","hi","what","thanks"];
        let nlScore = 0, enScore = 0;
        const txt = text.toLowerCase();
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
                if(text.toLowerCase().includes(kw)) return t.response;
            }
        }
        return lang === "nl" ? "Sorry, ik weet daar nog niet op te reageren." : "Sorry, I don't know how to respond to that yet.";
    }

    async function fetchFact(query) {
        return null; // placeholder voor echte API
    }

    return {
        ask: async function(message) {
            const fact = await fetchFact(message);
            return fact || smartResponse(message);
        }
    };
})();
