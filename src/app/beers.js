// beerTypes.js
const beerTypes = [
    { value: "Guinness", label: "Guinness" },
    { value: "San Miguel", label: "San Miguel" },
    { value: "Magners", label: "Magners" },
    { value: "Stella Artois", label: "Stella Artois" },
    { value: "Stella Artois Unfiltered", label: "Stella Artois Unfiltered" },
    { value: "Peroni", label: "Peroni" },
    { value: "Heineken", label: "Heineken" },
    { value: "Corona", label: "Corona" },
    { value: "Kopparberg", label: "Kopparberg" },
    { value: "Strongbow", label: "Strongbow" },
    { value: "Bulmers", label: "Bulmers" },
    { value: "Budweiser", label: "Budweiser" },
    { value: "Old Speckled Hen", label: "Old Speckled Hen" },
    { value: "Thatchers", label: "Thatchers" },
    { value: "Camden Hells", label: "Camden Hells" },
    { value: "Camden Pale", label: "Camden Pale" },
    { value: "Carling", label: "Carling" },
    { value: "Strongbow Dark Fruits", label: "Strongbow Dark Fruits" },
    { value: "Amstel", label: "Amstel" },
    { value: "BrewDog", label: "BrewDog" },
    { value: "Carlsberg", label: "Carlsberg" },
    { value: "Tetley's Brewery", label: "Tetley's Brewery" },
    { value: "Grolsch", label: "Grolsch" },
    { value: "Kronenbourg 1664", label: "Kronenbourg 1664" },
    { value: "Marston's", label: "Marston's" },
    { value: "Hobgoblin", label: "Hobgoblin" },
    { value: "London Pride", label: "London Pride" },
    { value: "Tiger Beer", label: "Tiger Beer" },
    { value: "Estrella Damm", label: "Estrella Damm" },
    { value: "Beck's", label: "Beck's" },
    { value: "John Smith's", label: "John Smith's" },
    { value: "Birra Moretti", label: "Birra Moretti" },
    { value: "Murphy's", label: "Murphy's" },
    { value: "Woodpecker Cider", label: "Woodpecker Cider" },
    { value: "Coors Light", label: "Coors Light" },
    { value: "Corona Extra", label: "Corona Extra" },
    { value: "Old Mout", label: "Old Mout" },
    { value: "Foster's", label: "Foster's" },
    { value: "Sol", label: "Sol" },
    { value: "Boddingtons", label: "Boddingtons" },
    { value: "Marston's Pedigree", label: "Marston's Pedigree" },
    { value: "Desperados", label: "Desperados" },
    { value: "Red Stripe", label: "Red Stripe" },
    { value: "Newcastle Brown Ale", label: "Newcastle Brown Ale" },
    { value: "Doom Bar", label: "Doom Bar" },
    { value: "Leffe", label: "Leffe" },
    { value: "Old Peculier", label: "Old Peculier" },
    { value: "Chef & Brewer", label: "Chef & Brewer" },
    { value: "Greene King IPA", label: "Greene King IPA" },
    { value: "Shandy Bass", label: "Shandy Bass" },
    { value: "Black Sheep", label: "Black Sheep" },
    { value: "Carling Cider", label: "Carling Cider" },
    { value: "Beavertown", label: "Beavertown" },
    { value: "Rekorderlig", label: "Rekorderlig" },
    { value: "Fuller's", label: "Fuller's" },
    { value: "Bass", label: "Bass" },
    { value: "Banks Amber Bitter", label: "Banks Amber Bitter" },
    { value: "Adnams", label: "Adnams" },
    { value: "Old Crafty Hen", label: "Old Crafty Hen" },
    { value: "Kopparberg", label: "Kopparberg" },
    { value: "Efes", label: "Efes" },
    { value: "Skol", label: "Skol" },
    { value: "Hoegaarden", label: "Hoegaarden" },
    { value: "Thwaites", label: "Thwaites" },
    { value: "Camden Hells Lager", label: "Camden Hells Lager" },
    { value: "Worthington's", label: "Worthington's" },
    { value: "Adnams", label: "Adnams" },
    { value: "Bavaria", label: "Bavaria" },
    { value: "Abbot Ale", label: "Abbot Ale" },
    { value: "Bud Light", label: "Bud Light" },
    { value: "Erdinger", label: "Erdinger" },
    { value: "Brothers Cider", label: "Brothers Cider" },
    { value: "Bishops Finger", label: "Bishops Finger" },
    { value: "Henry Westons Vintage Cider", label: "Henry Westons Vintage Cider" },
    { value: "Tennent's", label: "Tennent's" },
    { value: "Merrydown", label: "Merrydown" },
    { value: "Asahi", label: "Asahi" },
    { value: "Miller", label: "Miller" },
    { value: "Somersby", label: "Somersby" },
    { value: "BrewDog Lost Lager", label: "BrewDog Lost Lager" },
    { value: "BrewDog Punk IPA", label: "BrewDog Punk IPA" },
    { value: "John Smiths", label: "John Smiths" },
    { value: "Marstons", label: "Marstons" },
    { value: "Cruzcampo", label: "Cruzcampo" },
    { value: "Mcewans", label: "Mcewans" },
    { value: "Whitstable Bay", label: "Whitstable Bay" },
    { value: "Cobra Indian", label: "Cobra Indian" },
    { value: "Staropramen", label: "Staropramen" },
    { value: "Erdinger", label: "Erdinger" },
    { value: "Aspall", label: "Aspall" },
    { value: "Newcastle Brown", label: "Newcastle Brown" },
    { value: "Madri", label: "Madri" },
    { value: "Doombar", label: "Doombar" },
    { value: "Desperados", label: "Desperados" },
    { value: "Abbott", label: "Abbott" },
    { value: "Oakham", label: "Oakham" },
    { value: "Black Sheep", label: "Black Sheep" },
    { value: "Rattler", label: "Rattler" },
    { value: "Sheppys", label: "Sheppys" },
    { value: "Woodforde", label: "Woodforde" },
    { value: "Warsteiner", label: "Warsteiner" },
    { value: "Holsten", label: "Holsten" },
    { value: "Inch's", label: "Inch's" },
    { value: "Brothers Cider", label: "Brothers Cider" },
    { value: "Staropramen", label: "Staropramen" },
    { value: "Old Golden Hen", label: "Old Golden Hen" },
    { value: "St Austell", label: "St Austell" },
    { value: "Singha", label: "Singha" },
    { value: "Henry Westons", label: "Henry Westons" },
    { value: "Savanna Dry Cider", label: "Savanna Dry Cider" },
    { value: "Oranjeboom", label: "Oranjeboom" },
    { value: "Pilsner Urquell", label: "Pilsner Urquell" },
    { value: "Tsingtao Beer", label: "Tsingtao Beer" },
    { value: "Caffrey's", label: "Caffrey's" },
    { value: "Blackthorn", label: "Blackthorn" },
    { value: "Spitfire Kentish Ale", label: "Spitfire Kentish Ale" },
    { value: "Bombardier", label: "Bombardier" },
    { value: "Wadworth", label: "Wadworth" },
    { value: "Westons", label: "Westons" },
    { value: "Harp", label: "Harp" },
    { value: "Badger Ales", label: "Badger Ales" },
    { value: "Tyskie", label: "Tyskie" },
    { value: "Special Brew", label: "Special Brew" },
    { value: "Duvel", label: "Duvel" },
    { value: "Tanglefoot", label: "Tanglefoot" },
    { value: "Brakspear Triple", label: "Brakspear Triple" },
    { value: "McEwan's", label: "McEwan's" },
    { value: "Wainwright", label: "Wainwright" },
    { value: "Timothy Taylor", label: "Timothy Taylor" },
    { value: "Courage Directors", label: "Courage Directors" },
    { value: "Shepherd Neame", label: "Shepherd Neame" },
    { value: "Fursty Ferret", label: "Fursty Ferret" },
    { value: "Brahma", label: "Brahma" },
    { value: "Coopers", label: "Coopers" },
    { value: "Hop House 13", label: "Hop House 13" },
    { value: "Ruddles County", label: "Ruddles County" },
    { value: "Budějovický Budvar", label: "Budějovický Budvar" },
    { value: "Brains", label: "Brains" },
    { value: "Innis & Gunn", label: "Innis & Gunn" },
    { value: "Wychwood", label: "Wychwood" },
    { value: "Samuel Adams", label: "Samuel Adams" },
    { value: "Chang", label: "Chang" },
    { value: "TsingTao", label: "TsingTao" },
    { value: "Otter Ale", label: "Otter Ale" },
    { value: "Bells", label: "Bells" },
    { value: "Cruzcampo", label: "Cruzcampo" },
    { value: "Tuborg", label: "Tuborg" },
    { value: "K Cider", label: "K Cider" },
    { value: "Lindemans", label: "Lindemans" },
    { value: "Chimay", label: "Chimay" },
    { value: "Goose Island", label: "Goose Island" },
    { value: "Frosty Jack", label: "Frosty Jack" },
    { value: "Gaymer", label: "Gaymer" },
    { value: "Miller Genunine Draft", label: "Miller Genunine Draft" },
    { value: "Warsteiner", label: "Warsteiner" },
    { value: "Bath Ales", label: "Bath Ales" },
    { value: "Old Rosie", label: "Old Rosie" },
    { value: "Blue Boar Lager", label: "Blue Boar Lager" },
    { value: "Meantime Pale Ale", label: "Meantime Pale Ale" },
    { value: "Hawkstone", label: "Hawkstone" },
    { value: "Soho Lager", label: "Soho Lager" },
    { value: "Deuchars", label: "Deuchars" },
    { value: "Prava", label: "Prava" },




    // Add more beer types as needed
];

export default beerTypes;