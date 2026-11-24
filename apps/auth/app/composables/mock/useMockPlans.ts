export default function useMockPlans() {
  return [
    {
      id: 'plan-1',
      name: {
        fr: 'Start',
      },
      description: {
        fr: 'Jusqu\'à 50 apprenants',
      },
      price: {
        yearly: 696,
        monthly: 69,
      },
    },
    {
      id: 'plan-2',
      name: {
        fr: 'Pro',
      },
      description: {
        fr: 'Jusqu\'à 100 apprenants, Qualiopi, Boutique',
      },
      price: {
        yearly: 696,
        monthly: 69,
      },
      popular: true,
    },
    {
      id: 'plan-3',
      name: {
        fr: 'Business',
      },
      description: {
        fr: 'Jusqu\'à 250 apprenants, Qualiopi, Boutique, SMTP & domaine personnalisé',
      },
      price: {
        yearly: 696,
        monthly: 69,
      },
    },
  ];
}
