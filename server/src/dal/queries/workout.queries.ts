import { randomUUID } from "crypto";

export const workoutPrompt = `
Imagine you are a fitness trainer assigned for a task of creating advanced training programs for your trainee. 
Your training programs should split into A, B, C technic where each day you work out on two body parts. 
>>> Instructions :
- Each training workout spoused to be around 40 minutes to one hour. 
- I want you to create this workout and return the response in a json array format. 
- In each workout when starting to work on specific muscle start with a compound exercise, 
- each muscle should have at least 3 exercises. 
- The duration field should be calculated for each workout, To calculate the workout duration sum all exercises and multiply be the number of sets and multiple again by 1.5 minutes. Put this calculated time in the duration field
- The response should include just the response json
[
	{
		“title”: {{ working body parts }},
		“duration”: {{ calculated  workout time }},
		“exercises” : [
			{
				“name”: {{ name of the exercise }},
				“sets”: {{ number of sets }},
				“mainWorkingMuscle” : {{ main active muscle }},
                “rest”: {{ rest time between sets }},
                “description”: {{ short description and things the trainer should put attention }},
				“link”: {{ if possible link to a video explaining the exercises  }}
			}
		]
	}
]`;

export const hardCodedSimpleResponse = [
  {
    id: randomUUID(),
    type: "Strength",
    durationMin: 45,
    datetime: new Date(),
    calories: 300,
    isDone: false,
  },
  {
    id: randomUUID(),
    type: "Cardio",
    durationMin: 42,
    datetime: new Date(),
    calories: 300,
    isDone: false,
  },
  {
    id: randomUUID(),
    type: "Flexibility",
    durationMin: 15,
    datetime: new Date(),
    calories: 120,
    isDone: false,
  },
  {
    id: randomUUID(),
    type: "Cycling",
    durationMin: 180,
    datetime: new Date(),
    calories: 900,
    isDone: false,
  },
];

export const hardCodedAdvancedResponse = [
  {
    title: "Chest and Triceps",
    duration: "49.5 minutes",
    exercises: [
      {
        name: "Bench Press",
        sets: 3,
        mainWorkingMuscle: "Chest",
        rest: "90 seconds",
        description:
          "A compound exercise targeting the chest, triceps, and shoulders. Ensure to maintain a controlled motion and avoid bouncing the bar off the chest.",
        link: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
      },
      {
        name: "Incline Dumbbell Press",
        sets: 3,
        mainWorkingMuscle: "Upper Chest",
        rest: "90 seconds",
        description:
          "Focuses on the upper chest. Keep a controlled motion and avoid locking out the elbows.",
        link: "https://www.youtube.com/watch?v=8iPEnn-ltC8",
      },
      {
        name: "Chest Flyes",
        sets: 3,
        mainWorkingMuscle: "Chest",
        rest: "60 seconds",
        description:
          "Isolates the chest muscles. Keep a slight bend in the elbows and avoid overstretching.",
        link: "https://www.youtube.com/watch?v=eozdVDA78K0",
      },
      {
        name: "Tricep Dips",
        sets: 3,
        mainWorkingMuscle: "Triceps",
        rest: "90 seconds",
        description:
          "Targets the triceps. Keep your body upright and avoid swinging.",
        link: "https://www.youtube.com/watch?v=0326dy_-CzM",
      },
      {
        name: "Tricep Pushdown",
        sets: 3,
        mainWorkingMuscle: "Triceps",
        rest: "60 seconds",
        description:
          "Focuses on the triceps. Keep your elbows close to your body and avoid using your shoulders.",
        link: "https://www.youtube.com/watch?v=2-LAMcpzODU",
      },
      {
        name: "Overhead Tricep Extension",
        sets: 3,
        mainWorkingMuscle: "Triceps",
        rest: "60 seconds",
        description:
          "Targets the long head of the triceps. Keep your elbows close to your head and avoid arching your back.",
        link: "https://www.youtube.com/watch?v=XDsNyb0N6S8",
      },
    ],
  },
  {
    title: "Back and Biceps",
    duration: "45 minutes",
    exercises: [
      {
        name: "Deadlift",
        sets: 3,
        mainWorkingMuscle: "Back",
        rest: "90 seconds",
        description:
          "A compound exercise that targets the back, glutes, and hamstrings. Keep your back straight and lift with your legs.",
        link: "https://www.youtube.com/watch?v=ytGaGIn3SjE",
      },
      {
        name: "Pull-Ups",
        sets: 3,
        mainWorkingMuscle: "Upper Back",
        rest: "90 seconds",
        description:
          "Targets the upper back and biceps. Avoid swinging and keep a controlled motion.",
        link: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
      },
      {
        name: "Bent Over Rows",
        sets: 3,
        mainWorkingMuscle: "Middle Back",
        rest: "90 seconds",
        description:
          "Focuses on the middle back. Keep your back straight and pull with your elbows.",
        link: "https://www.youtube.com/watch?v=ZlRrIsoDpKg",
      },
      {
        name: "Bicep Curls",
        sets: 3,
        mainWorkingMuscle: "Biceps",
        rest: "60 seconds",
        description:
          "Isolates the biceps. Avoid swinging and keep your elbows close to your body.",
        link: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
      },
      {
        name: "Hammer Curls",
        sets: 3,
        mainWorkingMuscle: "Biceps",
        rest: "60 seconds",
        description:
          "Targets the brachialis and biceps. Keep a controlled motion and avoid swinging.",
        link: "https://www.youtube.com/watch?v=TwD-YGVP4Bk",
      },
      {
        name: "Concentration Curls",
        sets: 3,
        mainWorkingMuscle: "Biceps",
        rest: "60 seconds",
        description:
          "Isolates the biceps. Keep your elbow against your thigh and avoid swinging.",
        link: "https://www.youtube.com/watch?v=dDI8x8UJrfY",
      },
    ],
  },
  {
    title: "Legs and Shoulders",
    duration: "45 minutes",
    exercises: [
      {
        name: "Squats",
        sets: 3,
        mainWorkingMuscle: "Legs",
        rest: "90 seconds",
        description:
          "A compound exercise targeting the legs and glutes. Keep your back straight and avoid letting your knees go past your toes.",
        link: "https://www.youtube.com/watch?v=Dy28eq2PjcM",
      },
      {
        name: "Leg Press",
        sets: 3,
        mainWorkingMuscle: "Legs",
        rest: "90 seconds",
        description:
          "Focuses on the quadriceps, hamstrings, and glutes. Keep a controlled motion and avoid locking out your knees.",
        link: "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
      },
      {
        name: "Leg Curls",
        sets: 3,
        mainWorkingMuscle: "Hamstrings",
        rest: "60 seconds",
        description:
          "Targets the hamstrings. Keep a controlled motion and avoid swinging.",
        link: "https://www.youtube.com/watch?v=1Tq3QdYUuHs",
      },
      {
        name: "Shoulder Press",
        sets: 3,
        mainWorkingMuscle: "Shoulders",
        rest: "90 seconds",
        description:
          "A compound exercise targeting the shoulders. Keep a controlled motion and avoid arching your back.",
        link: "https://www.youtube.com/watch?v=B-aVuyhvLHU",
      },
      {
        name: "Lateral Raises",
        sets: 3,
        mainWorkingMuscle: "Shoulders",
        rest: "60 seconds",
        description:
          "Isolates the lateral deltoids. Keep a slight bend in the elbows and avoid swinging.",
        link: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
      },
      {
        name: "Front Raises",
        sets: 3,
        mainWorkingMuscle: "Shoulders",
        rest: "60 seconds",
        description:
          "Targets the front deltoids. Keep a controlled motion and avoid swinging.",
        link: "https://www.youtube.com/watch?v=-t7fuZ0KhDA",
      },
    ],
  },
];
