function skillsMember() {
    var member = {
        name: "John",
        age: 30,
        skills: ["javascript", "html", "css"],
        address: {
            street: "123 main st",
            city: "Boston",
            state: "MA"
        },
        getSkills: function() {
            return this.skills;
        }
    };
    return member;
}