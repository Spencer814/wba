angular.module('starter.services', [])

.factory('Programs', function() {

  var programs = [{
    id: 1,
    title: 'Two Year Olds',
    text: 'Our two year old program follows the WEE Learn Curriculum and is play based and encourages children to learn through exploration.',
    img: 'img/number-two-in-a-circle.svg'
  }, {
    id: 2,
    title: 'Three Year Olds',
    text: 'Our three year old program follows the WEE Learn Curriculum and is play based and encourages children to learn through hands-on experiences.',
    img: 'img/number-three-in-a-circle.svg'
  }, {
    id: 3,
    title: 'Four Year Olds',
    text: 'Our four year old program is a stepping-stone to Kindergarten.  It is a theme-based curriculum, which gives children an academic foundation to build upon.  We follow the Scholastic Big Day for Pre-K Curiculum.',
    img: 'img/number-four-in-circular-button.svg'
  }, {
    id: 4,
    title: 'Kindergarten',
    text: 'Our developmentally appropriate Kindergarten program equips children with the foundations of learning in math, science, literacy, handwriting, and social studies. Our small class size provides optimal one-on-one instruction and buiilds a unique classroom community.  We use the Pearson Reading Street and EnVision Math curriculums.',
    img: 'img/crayon.svg'
  }, {
    id: 5,
    title: 'School Age',
    text: 'Our school age program offers students a friendly and safe place for children to come together after school to work on homework, play, and build lasting friendships, Our school aligns with the Chesapeake school calendar and offers full day programming during teacher work days.  Pre-registration is required for teacher work days and limited space is available.  We serve Chittum Elementary, Western Branch Primary, and Western Branch Intermediate.',
    img: 'img/school-bus.svg'
  }];

  return {
    all: function () {
      return programs;
    },
    remove: function (program) {
      programs.splice(programs.indexOf(program), 1);
    },
    get: function (programId) {
      for (var i = 0; i < programs.length; i++) {
        if (programs[i].id === parseInt(programId)) {
          return programs[i];
        }
      }
      return null;
    }
  };
})

.factory('Persons', function () {

  var persons = [{
    id: 0,
    name: 'Cynthia Zerr',
    title: 'Owner/Executive Director',
    text: 'Cindy Zerr has extensive background/ experience in management in Early Childhood Education. Cindy Zerr has an Associate’s in Early Childhood Education, a Bachelor’s in Soclal Work and a Masters in Early Childhood Education. She has been a Director for the past fourteen years and has been in the field of early childhood for thirty years.'
  }, {
    id: 1,
    name: 'Aimee Ha',
    title: 'Technology Teacher/Assistant Director',
    text: 'Aimee Ha graduated from Missouri State University with a Bachelor\'s Degree in Anthropology. She has several years of experience as an Assistant Teacher at WBA. In addition, she has been a nanny, taught ESL to both children and adults, and spent a year teaching abroad in France. She\'s excited to bring her experience teaching in various settings and her passion for technology to this position. Computer classes teach kids healthy ways to use technology as a tool, not just a toy. These classes will teach the children some of today’s most important “Top 100” computer skills.'
  }, {
    id: 2,
    name: 'Natalie Emery',
    title: 'Book Keeper',
    text: 'Natalie Emery has experience in management and teaching in Early Childhood Education. She has one year Director experience, three years experience as an Assistant Director, six years teaching experience, and has been in the field of early childhood for eight years. She has a Bachelor’s in Environmental Science and 13 credit hours in child-related coursework.'
  }, {
    id: 3,
    name: 'Lauren Williams',
    title: 'Curriculum Coordinator',
    text: 'Lauren Williams graduated from Tidewater Community College with an Associate\'s Degree in Early Childhood Development.  Her experience includes working as a Teacher Assistant and PK4 Teacher at WBA and as a nanny.  She is a loving, patient, and motivated person who loves teaching preschoolers.'
  }, {
    id: 4,
    name: 'Natasha Leshanski',
    title: 'Enrichment Teacher/Music Director/School Age Teacher',
    text: 'Natasha Leshanski is a graduate of the American Musical and Dramatic Academy of Manhattan, New York. She was a member of numerous Repertory companies throughout the city and studied voice and dance in addition to acting. While in New York, Natasha studied various foreign languages and worked as a private nanny. She has traveled extensively and has attended language schools in both Jordan and Costa Rica. Natasha brings her experience in many different types of learning situations and exposure to many cultures to WBA.'
  }, {
    id: 5,
    name: 'Kaleigh Newman',
    title: 'Pre-Kindergarten 2 Year Old Teacher',
    text: 'Kaleigh Newman has experience in various settings as a Teaching Assistant. She is currently finishing her Associate\'s Degree in Early Childhood Development. She is also a mother of two young children. Her loving, fun attitude is perfect for our two year olds.'
  }, {
    id: 6,
    name: 'Mandy Phillips',
    title: 'Pre-Kindergarten 2 and 3 Year Old Teacher',
    text: 'Mandy Phillips has been Western Branch Academy for the past four years.  She is in the final semester of her Associate\'s in Early Childhood Education.  She is the Mother of four boys and  a daughter.'
  }, {
    id: 7,
    name: 'Carol Beaver',
    title: 'Pre-Kindergarten 3 Year Old Teacher',
    text: 'Carol Beaver has a Bachelor\'s Degree in Elementary Education and a Masters in Elementary Education. She has extensive teaching experience in the public school system and taught for 1 year at Green Acres Preschool. Her experience with young children will be a great asset to our teaching team.'
  }, {
    id: 8,
    name: 'Stacey Goode',
    title: 'Pre-Kindergarten 4 Year Old Teacher',
    text: 'Stacey Goode graduated from Tidewater Community College with an Associate\'s Degree in Business Administration with a Early Childhood Development certificate.  Her experience includes owning her own home daycare and volunteering in the public schools.Stacey\'s affectionate and bubbly attitude creates a warm nurturing environment for her students.'
  }, {
    id: 9,
    name: 'Jennifer Kelley',
    title: 'Pre-Kindergarten 4 Year Old Teacher',
    text: '​Jennifer Kelley has a Bachelor\'s Degree in Elementary Education from ODU.  She has taught preschool for the past five years.  She also loves floral design.'
  }, {
    id: 10,
    name: 'Katie Earley',
    title: 'Pre-Kindergarten 4 Year Old Teacher',
    text: 'Katie Earley graduated from William Paterson University with a degree in Education.  She is certified to teach preschool through grade 5.  Her experience includes several years of working as a lead teacher for various ages in an early childhood setting.  Her patience and creativity give her the ability to effectively run a loving and organized classroom.'
  }, {
    id: 11,
    name: 'Jessica Breakfield',
    title: 'Kindergarten Teacher',
    text: 'Jessica Breakfield graduated from Old Dominion University with a Masters in Education. She is licensed to teach preschool through sixth grade. She has worked at WBA in the summer since 2013 and she has previously taught in Suffolk Public Schools. Her patience and cheerful attitude will make her a wonderful Kindergarten teacher.'
  }];

  return {
    all: function () {
      return persons;
    },
    remove: function (person) {
      persons.splice(persons.indexOf(person), 1);
    },
    get: function (personId) {
      for (var i = 0; i < persons.length; i++) {
        if (persons[i].id === parseInt(personId)) {
          return persons[i];
        }
      }
      return null;
    }
  };
})

.factory('Events', function() {

  var events = [{
    id: 1,
    title: 'July 4th',
    text: 'No camp - Happy 4th of July!',
  }, {
    id: 2,
    title: 'August 29th - September 2nd',
    text: 'WBA closed'
  }, {
    id: 3,
    title: 'September 1st',
    text: 'Fall Meet and Greet'
  }, {
    id: 4,
    title: 'September 5th',
    text: 'Labor Day'
  }, {
    id: 5,
    title: 'September 6th',
    text: '1st day of school'
  }];

  return {
    all: function () {
      return events;
    },
    remove: function (event) {
      events.splice(events.indexOf(event), 1);
    },
    get: function (eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(eventId)) {
          return events[i];
        }
      }
      return null;
    }
  };
});
