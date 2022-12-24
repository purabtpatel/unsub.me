export const standard = defineScenario({
  audit: {
    one: {
      data: {
        log: 'String',
        user: {
          create: {
            email: 'String8539119',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        log: 'String',
        user: {
          create: {
            email: 'String791498',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})
