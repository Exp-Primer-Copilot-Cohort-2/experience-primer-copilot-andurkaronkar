function skillsMember(){
        var member = {
        name: 'John Doe',
        skills: ['JavaScript', 'Java', 'SQL'],
        details: function(){
            this.skills.forEach(function(skill){
                console.log(`${this.name} knows ${skill}`);
            });
        }
    };
    member.details();
}