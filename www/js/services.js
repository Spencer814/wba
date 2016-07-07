angular.module('wbaApp.services', [])

.factory('Photos', function() {

	var photos = [{
		id: 0,
		src: 'img/IMG_7874.jpg'
	}, {
		id: 1,
		src: 'img/IMG_7904.jpg'
	}, {
		id: 2,
		src: 'img/IMG_7923.jpg'
	}, {
		id: 3,
		src: 'img/IMG_7942.jpg'
	}, {
		id: 4,
		src: 'img/IMG_7957.jpg'
	}];

	return {
		all: function () {
			return photos;
		},
		remove: function (photo) {
			photos.splice(photos.indexOf(photo), 1);
		},
		get: function (photoId) {
			for (var i = 0; i < photos.length; i++) {
				if (photos[i].id === parseInt(photoId)) {
					return photos[i];
				}
			}
			return null;
		}
	};
})

.factory('Values', function() {

	var values = [{
		id: 0,
		text: 'Support families through strong partnerships'
	}, {
		id: 1,
		text: 'Transform curiosity into a love of learning'
	}, {
		id: 2,
		text: 'Nurture each child\'s unique qualities and potential'
	}, {
		id: 3,
		text: 'Foster opportunities to learn about God\'s world'
	}, {
		id: 4,
		text: 'Establish a work environment where professionalism, growth, collaboration, and creativity are demonstrated'
	}, {
		id: 5,
		text: 'Connect with the community through community service projects'
	}, {
		id: 6,
		text: 'Meet the changing preschool educational needs of the community'
	}];

	return {
		all: function () {
			return values;
		},
		remove: function (value) {
			values.splice(values.indexOf(value), 1);
		},
		get: function (valueId) {
			for (var i = 0; i < values.length; i++) {
				if (values[i].id === parseInt(valueId)) {
					return values[i];
				}
			}
			return null;
		}
	};
})

.factory('Programs', function() {

	var programs = [{
		id: 0,
		title: 'Two Year Old',
		text: 'Our two year old program follows the WEE Learn Curriculum and is play based and encourages children to learn through exploration.',
		img: 'img/number-two-in-a-circle.svg'
	}, {
		id: 1,
		title: 'Three Year Old',
		text: 'Our three year old program follows the WEE Learn Curriculum and is play based and encourages children to learn through hands-on experiences.',
		img: 'img/number-three-in-a-circle.svg'
	}, {
		id: 2,
		title: 'Four Year Old',
		text: 'Our four year old program is a stepping-stone to Kindergarten.  It is a theme-based curriculum, which gives children an academic foundation to build upon.  We follow the Scholastic Big Day for Pre-K Curiculum.',
		img: 'img/number-four-in-circular-button.svg'
	}, {
		id: 3,
		title: 'Kindergarten',
		text: 'Our developmentally appropriate Kindergarten program equips children with the foundations of learning in math, science, literacy, handwriting, and social studies. Our small class size provides optimal one-on-one instruction and buiilds a unique classroom community.  We use the Pearson Reading Street and EnVision Math curriculums.',
		img: 'img/crayon.svg'
	}, {
		id: 4,
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

.factory('Admissions', function () {

	var admissions = [{
		id: 0,
		text: 'Registration Form'
	}, {
		id: 1,
		text: 'Parental Permission and Tuition Agreement Form'
	}, {
		id: 2,
		text: 'Enrollment Agreement Form'
	}, {
		id: 3,
		text: 'Completed Physical'
	}, {
		id: 4,
		text: 'Current Immunizations'
	}, {
		id: 5,
		text: 'Proof of Identity (e.g. Birth Certificate)'
	}, {
		id: 6,
		text: 'Fall Registration Fee ($110 1st child, $ 50 each additional child) Summer Registration Fee ($75 1st child, $50 each additional child)'
	}, {
		id: 7,
		text: 'School Year Activity Fee ($40-2 yo, $50-3 yo, $75-4 yo, and $100-Kindergarten)'
	}];

	return {
		all: function () {
			return admissions;
		},
		remove: function (admission) {
			admissions.splice(admissions.indexOf(admission), 1);
		},
		get: function (admissionId) {
			for (var i = 0; i < admissions.length; i++) {
				if (admissions[i].id === parseInt(admissionId)) {
					return admissions[i];
				}
			}
			return null;
		}
	};
})

.factory('Docs', function () {

	var docs = [{
		id: 0,
		text: 'Registration Packet'
	}, {
		id: 1,
		text: 'Shot Record with Physical Form (Must receive within first 30 days of enrollment)'
	}, {
		id: 2,
		text: 'Birth Certificate'
	}, {
		id: 3,
		text: 'School supplies (Refer to Supply List)'
	}, {
		id: 4,
		text: 'Tote bag'
	}, {
		id: 5,
		text: 'Seasonal change of clothes with socks (Please place in labelled ziploc bag)'
	}, {
		id: 6,
		text: 'Nap map and crib sheet (full days students)'
	}];

	return {
		all: function () {
			return docs;
		},
		remove: function (doc) {
			docs.splice(docs.indexOf(doc), 1);
		},
		get: function (docId) {
			for (var i = 0; i < docs.length; i++) {
				if (docs[i].id === parseInt(docId)) {
					return docs[i];
				}
			}
			return null;
		}
	};
})

.factory('Events', function() {

	var events = [{
		id: 0,
		title: 'July 4th',
		text: 'No camp - Happy 4th of July!'
	}, {
		id: 1,
		title: 'August 29th - September 2nd',
		text: 'WBA closed'
	}, {
		id: 2,
		title: 'September 1st',
		text: 'Fall Meet and Greet'
	}, {
		id: 3,
		title: 'September 5th',
		text: 'Labor Day'
	}, {
		id: 4,
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
})

.factory('Newsletters', function() {

	var newsletters = [{
		id: 0,
		title: 'May-June 2016',
		src: 'docs/news/May___June_2016_Newsletter.pdf'
	}, {
		id: 1,
		title: 'April 2016',
		src: 'docs/news/April_2016_Newsletter.pdf'
	}, {
		id: 2,
		title: 'March 2016',
		src: 'docs/news/Mar_2016_Newsletter.pdf'
	}, {
		id: 3,
		title: 'February 2016',
		src: 'docs/news/February__2016_Newsletter.pdf'
	}, {
		id: 4,
		title: 'January 2016',
		src: 'docs/news/January_2016_Newsletter.pdf'
	}, {
		id: 5,
		title: 'December 2015',
		src: 'docs/news/December_2015_Newsletter.pdf'
	}, {
		id: 6,
		title: 'November 2015',
		src: 'docs/news/November_2015_Newsletter.pdf'
	}, {
		id: 7,
		title: 'October 2015',
		src: 'docs/news/October_2015_Newsletter.pdf'
	}, {
		id: 8,
		title: 'September 2015',
		src: 'docs/news/September_Newsletter_2015.pdf'
	}];

	return {
		all: function () {
			return newsletters;
		},
		remove: function (newsletter) {
			newsletters.splice(newsletters.indexOf(newsletter), 1);
		},
		get: function (newsletterId) {
			for (var i = 0; i < news.length; i++) {
				if (newsletters[i].id === parseInt(newsletterId)) {
					return newsletters[i];
				}
			}
			return null;
		}
	};
})

.factory('Rules', function () {

	var rules = [{
		id: 0,
		text: 'The pick up zone is the area in front of the school where the railroad ties line the grass.'
	}, {
		id: 1,
		text: 'Drive up all the way to the end of the pick up zone and stay to the outside of the circle.'
	}, {
		id: 2,
		text: 'If a car in front of you drives away and you are still waiting for your child, please pull your car forward.'
	}, {
		id: 3,
		text: 'If your child is loaded into your car and another car in front of you is loading a child, please wait until they are loaded and pull away.'
	}, {
		id: 4,
		text: 'If you must drive around a car waiting for a child, please drive slowly and close to the inside of the circle.  Please do not pass more than one car.'
	}, {
		id: 5,
		text: 'All traffic must go around the circle in a counterclockwise direction.  Do not turn around and go against traffic.'
	}];

	return {
		all: function () {
			return rules;
		},
		remove: function (rule) {
			rules.splice(persons.indexOf(rule), 1);
		},
		get: function (ruleId) {
			for (var i = 0; i < rules.length; i++) {
				if (rules[i].id === parseInt(ruleId)) {
					return rules[i];
				}
			}
			return null;
		}
	};
})

.factory('Extras', function() {

	var extras = [{
		id: 0,
		title: 'Dancing Little Stars',
		day: 'Tuesdays',
		time: '2:30 - 3:30 pm',
		url: 'virginialittlestars.com'
	}, {
		id: 1,
		title: 'Soccer Shots',
		day: '2 sessions on Wednesdays',
		time: '2:30 - 3:00 pm and 3:00 - 3:30 pm',
		url: 'hamptonroads.ssreg.org'
	}, {
		id: 2,
		title: 'Fun Bus',
		day: '2 sessions on Tuesdays',
		time: '2:30 - 3:00 pm and 3:00 - 3:30 pm',
		url: 'funbuses.com/hamptonroads'
	}];

	return {
		all: function () {
			return extras;
		},
		remove: function (extra) {
			events.splice(extras.indexOf(extra), 1);
		},
		get: function (extraId) {
			for (var i = 0; i < extras.length; i++) {
				if (extras[i].id === parseInt(extraId)) {
					return extras[i];
				}
			}
			return null;
		}
	};
});
