export const signalStages = [
  'Unknown',
  'Threat Intelligence',
  'Traffic Anomaly',
  'External Recon',
  'Attack Stage',
  'Exploitation',
  'Collection',
  'Internal Recon',
  'Execution',
  'Persistence',
  'Privilege Escalation',
  'Defense Evasion',
  'Credential Access',
  'Discovery',
  'Lateral Movement',
  'Exfiltration',
  'C2',
  'Rule'
];

// export const signals = [
//   {
//     id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
//     category: 'Threat Intelligence',
//     contentType: 'threatintel',
//     description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
//     name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
//     severity: 6,
//     timestamp: generateDate(8)
//   },
//   {
//     id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
//     category: 'Defense Evasion',
//     contentType: 'rule',
//     description: 'TAudit Log Cleared',
//     name: 'Windows Audit Log Was Cleared',
//     severity: 2,
//     timestamp: generateDate(7)
//   },
//   {
//     id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
//     category: 'C2',
//     contentType: 'anomaly',
//     description:
//       'The flows detected have a repeating pattern indicating periodic communication.',
//     name: 'Beaconing Communication Detected',
//     severity: 5,
//     timestamp: generateDate(7)
//   },
//   {
//     id: '232233232-de85-5c67-a616-3ee7f38c9422',
//     category: 'Threat Intelligence',
//     contentType: 'threatintel',
//     description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
//     name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
//     severity: 0,
//     timestamp: generateDate(5)
//   },
//   {
//     id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
//     category: 'Exploitation',
//     contentType: 'rule',
//     description: 'EDR Log Alert',
//     name: 'EDR Log Alert',
//     severity: 10,
//     timestamp: generateDate(2)
//   }
// ];

// export const signalChartData = (() => {
//   return signals.map(s => ({
//     key: s.timestamp,
//     data: s.severity,
//     metadata: s,
//     id: s.id
//   }));
// })();
export const signalChartData = [
  {
    key: new Date('2020-02-23T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422'
  },
  {
    key: new Date('2020-02-24T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '4e18d1cd-de85-5c67-a616-3ee7f3349422'
  },
  {
    key: new Date('2020-02-24T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '4e18d1cd-de85-5c67-a616-3e344f38c9422'
  },
  {
    key: new Date('2020-02-26T08:00:00.000Z'),
    data: 0,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '232233232-de85-5c67-a616-3ee7f38c9422'
  },
  {
    key: new Date('2020-02-29T08:00:00.000Z'),
    data: 10,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '4e18d1cd-de85-3433-a616-3ee7f38c9422'
  }
];

// export const largeSignalChartData = (() => {
//   return range(150)
//     .map(i => ({
//       key: generateDate(i / randomNumber(1, 3)),
//       data: randomNumber(1, 10),
//       metadata: {
//         ...signals[randomNumber(0, signals.length - 1)]
//       },
//       id: `${new Date().getTime()}-${i}-${randomNumber(0, 500)}`
//     }))
//     .reverse();
// })();
export const largeSignalChartData = [
  {
    key: new Date('2019-12-18T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802589-149-242'
  },
  {
    key: new Date('2019-10-06T07:00:00.000Z'),
    data: 10,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802589-148-263'
  },
  {
    key: new Date('2019-12-19T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802589-147-90'
  },
  {
    key: new Date('2019-12-20T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802589-146-53'
  },
  {
    key: new Date('2019-12-20T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802589-145-28'
  },
  {
    key: new Date('2019-12-21T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802589-144-22'
  },
  {
    key: new Date('2020-01-14T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802589-143-288'
  },
  {
    key: new Date('2020-01-15T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802589-142-463'
  },
  {
    key: new Date('2019-12-22T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802589-141-370'
  },
  {
    key: new Date('2019-12-23T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802589-140-231'
  },
  {
    key: new Date('2019-10-15T07:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802589-139-266'
  },
  {
    key: new Date('2019-12-24T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802588-138-417'
  },
  {
    key: new Date('2019-12-24T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-137-43'
  },
  {
    key: new Date('2019-12-25T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-136-486'
  },
  {
    key: new Date('2019-12-25T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-135-133'
  },
  {
    key: new Date('2019-12-26T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-134-248'
  },
  {
    key: new Date('2019-12-26T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-133-425'
  },
  {
    key: new Date('2019-12-27T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-132-441'
  },
  {
    key: new Date('2019-10-23T07:00:00.000Z'),
    data: 3,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802588-131-292'
  },
  {
    key: new Date('2019-10-24T07:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-130-420'
  },
  {
    key: new Date('2019-10-25T07:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-129-365'
  },
  {
    key: new Date('2019-12-29T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802588-128-147'
  },
  {
    key: new Date('2019-12-29T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-127-193'
  },
  {
    key: new Date('2020-01-20T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802588-126-16'
  },
  {
    key: new Date('2019-10-29T07:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802588-125-81'
  },
  {
    key: new Date('2019-12-31T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802588-124-300'
  },
  {
    key: new Date('2020-01-21T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802588-123-279'
  },
  {
    key: new Date('2019-11-01T07:00:00.000Z'),
    data: 5,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802588-122-221'
  },
  {
    key: new Date('2019-11-02T07:00:00.000Z'),
    data: 3,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-121-461'
  },
  {
    key: new Date('2020-01-02T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802588-120-238'
  },
  {
    key: new Date('2019-11-04T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-119-268'
  },
  {
    key: new Date('2020-01-23T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802588-118-211'
  },
  {
    key: new Date('2019-11-06T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802588-117-131'
  },
  {
    key: new Date('2019-11-07T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802588-116-113'
  },
  {
    key: new Date('2020-01-04T08:00:00.000Z'),
    data: 10,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802588-115-314'
  },
  {
    key: new Date('2019-11-09T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802588-114-434'
  },
  {
    key: new Date('2020-01-24T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-113-114'
  },
  {
    key: new Date('2020-01-06T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-112-239'
  },
  {
    key: new Date('2019-11-12T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-111-94'
  },
  {
    key: new Date('2020-01-07T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802588-110-381'
  },
  {
    key: new Date('2019-11-14T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802588-109-388'
  },
  {
    key: new Date('2020-01-08T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-108-48'
  },
  {
    key: new Date('2019-11-16T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-107-301'
  },
  {
    key: new Date('2020-01-27T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-106-328'
  },
  {
    key: new Date('2019-11-18T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802588-105-335'
  },
  {
    key: new Date('2020-01-10T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802588-104-226'
  },
  {
    key: new Date('2019-11-20T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-103-372'
  },
  {
    key: new Date('2019-11-21T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802588-102-159'
  },
  {
    key: new Date('2020-01-28T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802587-101-217'
  },
  {
    key: new Date('2020-01-12T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-100-87'
  },
  {
    key: new Date('2019-11-24T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802587-99-63'
  },
  {
    key: new Date('2019-11-25T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-98-314'
  },
  {
    key: new Date('2020-01-13T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802587-97-339'
  },
  {
    key: new Date('2019-11-27T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802587-96-333'
  },
  {
    key: new Date('2020-01-14T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802587-95-390'
  },
  {
    key: new Date('2020-01-15T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-94-253'
  },
  {
    key: new Date('2020-01-15T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-93-391'
  },
  {
    key: new Date('2020-01-16T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802587-92-367'
  },
  {
    key: new Date('2020-01-16T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802587-91-12'
  },
  {
    key: new Date('2020-01-17T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802587-90-35'
  },
  {
    key: new Date('2020-01-17T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-89-383'
  },
  {
    key: new Date('2019-12-05T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802587-88-451'
  },
  {
    key: new Date('2020-02-02T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-87-174'
  },
  {
    key: new Date('2020-01-19T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802587-86-397'
  },
  {
    key: new Date('2020-02-03T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802587-85-102'
  },
  {
    key: new Date('2020-01-20T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-84-430'
  },
  {
    key: new Date('2019-12-10T08:00:00.000Z'),
    data: 10,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-83-404'
  },
  {
    key: new Date('2020-01-21T08:00:00.000Z'),
    data: 10,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802587-82-259'
  },
  {
    key: new Date('2020-02-04T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802587-81-123'
  },
  {
    key: new Date('2020-01-22T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-80-351'
  },
  {
    key: new Date('2020-01-22T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-79-146'
  },
  {
    key: new Date('2020-02-05T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-78-326'
  },
  {
    key: new Date('2020-01-23T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802587-77-20'
  },
  {
    key: new Date('2020-02-06T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-76-449'
  },
  {
    key: new Date('2020-01-24T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802587-75-175'
  },
  {
    key: new Date('2019-12-19T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802587-74-341'
  },
  {
    key: new Date('2020-02-07T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-73-259'
  },
  {
    key: new Date('2020-02-07T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-72-317'
  },
  {
    key: new Date('2020-02-07T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-71-226'
  },
  {
    key: new Date('2020-02-08T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802587-70-214'
  },
  {
    key: new Date('2019-12-24T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-69-226'
  },
  {
    key: new Date('2020-02-08T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802587-68-244'
  },
  {
    key: new Date('2020-02-09T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802587-67-328'
  },
  {
    key: new Date('2020-01-29T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-66-242'
  },
  {
    key: new Date('2020-01-29T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802587-65-485'
  },
  {
    key: new Date('2020-02-10T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802586-64-365'
  },
  {
    key: new Date('2020-01-30T08:00:00.000Z'),
    data: 10,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-63-82'
  },
  {
    key: new Date('2020-02-10T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-62-162'
  },
  {
    key: new Date('2020-02-11T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-61-12'
  },
  {
    key: new Date('2020-02-11T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-60-294'
  },
  {
    key: new Date('2020-02-01T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-59-141'
  },
  {
    key: new Date('2020-02-02T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-58-238'
  },
  {
    key: new Date('2020-02-02T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-57-309'
  },
  {
    key: new Date('2020-02-03T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-56-18'
  },
  {
    key: new Date('2020-01-07T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-55-297'
  },
  {
    key: new Date('2020-01-08T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802586-54-405'
  },
  {
    key: new Date('2020-02-13T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-53-79'
  },
  {
    key: new Date('2020-01-10T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-52-296'
  },
  {
    key: new Date('2020-01-11T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802586-51-13'
  },
  {
    key: new Date('2020-01-12T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-50-160'
  },
  {
    key: new Date('2020-02-06T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802586-49-400'
  },
  {
    key: new Date('2020-02-15T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-48-302'
  },
  {
    key: new Date('2020-01-15T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-47-242'
  },
  {
    key: new Date('2020-02-16T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-46-236'
  },
  {
    key: new Date('2020-02-08T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-45-97'
  },
  {
    key: new Date('2020-02-16T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802586-44-133'
  },
  {
    key: new Date('2020-02-09T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802586-43-197'
  },
  {
    key: new Date('2020-02-10T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-42-9'
  },
  {
    key: new Date('2020-02-10T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-41-260'
  },
  {
    key: new Date('2020-02-11T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-40-102'
  },
  {
    key: new Date('2020-02-11T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802586-39-132'
  },
  {
    key: new Date('2020-02-12T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-38-313'
  },
  {
    key: new Date('2020-02-12T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802586-37-372'
  },
  {
    key: new Date('2020-02-13T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802586-36-200'
  },
  {
    key: new Date('2020-02-13T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802586-35-406'
  },
  {
    key: new Date('2020-02-14T08:00:00.000Z'),
    data: 5,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-34-424'
  },
  {
    key: new Date('2020-02-20T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802585-33-195'
  },
  {
    key: new Date('2020-02-15T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-32-26'
  },
  {
    key: new Date('2020-02-15T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-31-227'
  },
  {
    key: new Date('2020-02-01T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-30-223'
  },
  {
    key: new Date('2020-02-16T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802585-29-260'
  },
  {
    key: new Date('2020-02-17T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-28-31'
  },
  {
    key: new Date('2020-02-22T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-27-161'
  },
  {
    key: new Date('2020-02-22T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802585-26-493'
  },
  {
    key: new Date('2020-02-23T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-25-139'
  },
  {
    key: new Date('2020-02-19T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-24-5'
  },
  {
    key: new Date('2020-02-19T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-23-202'
  },
  {
    key: new Date('2020-02-09T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802585-22-432'
  },
  {
    key: new Date('2020-02-20T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-21-466'
  },
  {
    key: new Date('2020-02-21T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-20-317'
  },
  {
    key: new Date('2020-02-25T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802585-19-392'
  },
  {
    key: new Date('2020-02-13T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-18-358'
  },
  {
    key: new Date('2020-02-22T08:00:00.000Z'),
    data: 6,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802585-17-22'
  },
  {
    key: new Date('2020-02-15T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802585-16-351'
  },
  {
    key: new Date('2020-02-23T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583219802585-15-372'
  },
  {
    key: new Date('2020-02-17T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802585-14-425'
  },
  {
    key: new Date('2020-02-24T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802585-13-86'
  },
  {
    key: new Date('2020-02-19T08:00:00.000Z'),
    data: 3,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802585-12-307'
  },
  {
    key: new Date('2020-02-25T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-11-429'
  },
  {
    key: new Date('2020-02-26T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-10-162'
  },
  {
    key: new Date('2020-02-26T08:00:00.000Z'),
    data: 2,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-9-115'
  },
  {
    key: new Date('2020-02-27T08:00:00.000Z'),
    data: 9,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802585-8-335'
  },
  {
    key: new Date('2020-02-27T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802585-7-29'
  },
  {
    key: new Date('2020-02-28T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802585-6-148'
  },
  {
    key: new Date('2020-02-26T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802584-5-183'
  },
  {
    key: new Date('2020-02-29T08:00:00.000Z'),
    data: 4,
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583219802584-4-376'
  },
  {
    key: new Date('2020-03-01T08:00:00.000Z'),
    data: 8,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802584-3-494'
  },
  {
    key: new Date('2020-03-01T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802584-2-87'
  },
  {
    key: new Date('2020-03-02T08:00:00.000Z'),
    data: 7,
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583219802584-1-112'
  },
  {
    key: new Date('2020-03-02T08:00:00.000Z'),
    data: 1,
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583219802584-0-422'
  }
];

export const medSignalChartData = [...largeSignalChartData].splice(0, 50);

// export const signalStageData = (() => {
//   return range(15)
//     .map(i => ({
//       key: generateDate(i / randomNumber(1, 3)),
//       data: signals[randomNumber(0, signals.length - 1)].category,
//       metadata: {
//         ...signals[randomNumber(0, signals.length - 1)]
//       },
//       id: `${new Date().getTime()}-${i}-${randomNumber(0, 500)}`
//     }))
//     .reverse();
// })();
export const signalStageData = [
  {
    key: new Date('2020-02-24T08:00:00.000Z'),
    data: 'Threat Intelligence',
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583220135633-14-161'
  },
  {
    key: new Date('2020-02-24T08:00:00.000Z'),
    data: 'C2',
    metadata: {
      id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 6,
      timestamp: new Date('2020-02-23T08:00:00.000Z')
    },
    id: '1583220135633-13-114'
  },
  {
    key: new Date('2020-02-27T08:00:00.000Z'),
    data: 'Exploitation',
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583220135633-12-299'
  },
  {
    key: new Date('2020-02-25T08:00:00.000Z'),
    data: 'Threat Intelligence',
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583220135633-11-114'
  },
  {
    key: new Date('2020-02-26T08:00:00.000Z'),
    data: 'Defense Evasion',
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583220135633-10-66'
  },
  {
    key: new Date('2020-02-26T08:00:00.000Z'),
    data: 'C2',
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583220135632-9-398'
  },
  {
    key: new Date('2020-02-23T08:00:00.000Z'),
    data: 'Threat Intelligence',
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583220135632-8-290'
  },
  {
    key: new Date('2020-02-27T08:00:00.000Z'),
    data: 'C2',
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
      category: 'Defense Evasion',
      contentType: 'rule',
      description: 'TAudit Log Cleared',
      name: 'Windows Audit Log Was Cleared',
      severity: 2,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583220135632-7-370'
  },
  {
    key: new Date('2020-02-28T08:00:00.000Z'),
    data: 'Defense Evasion',
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583220135632-6-193'
  },
  {
    key: new Date('2020-02-28T08:00:00.000Z'),
    data: 'Defense Evasion',
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583220135632-5-351'
  },
  {
    key: new Date('2020-03-01T08:00:00.000Z'),
    data: 'Threat Intelligence',
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583220135632-4-175'
  },
  {
    key: new Date('2020-03-01T08:00:00.000Z'),
    data: 'Defense Evasion',
    metadata: {
      id: '232233232-de85-5c67-a616-3ee7f38c9422',
      category: 'Threat Intelligence',
      contentType: 'threatintel',
      description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
      name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
      severity: 0,
      timestamp: new Date('2020-02-26T08:00:00.000Z')
    },
    id: '1583220135632-3-283'
  },
  {
    key: new Date('2020-03-01T08:00:00.000Z'),
    data: 'Defense Evasion',
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583220135632-2-125'
  },
  {
    key: new Date('2020-03-01T08:00:00.000Z'),
    data: 'Threat Intelligence',
    metadata: {
      id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
      category: 'C2',
      contentType: 'anomaly',
      description:
        'The flows detected have a repeating pattern indicating periodic communication.',
      name: 'Beaconing Communication Detected',
      severity: 5,
      timestamp: new Date('2020-02-24T08:00:00.000Z')
    },
    id: '1583220135632-1-443'
  },
  {
    key: new Date('2020-03-02T08:00:00.000Z'),
    data: 'C2',
    metadata: {
      id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
      category: 'Exploitation',
      contentType: 'rule',
      description: 'EDR Log Alert',
      name: 'EDR Log Alert',
      severity: 10,
      timestamp: new Date('2020-02-29T08:00:00.000Z')
    },
    id: '1583220135632-0-158'
  }
];
