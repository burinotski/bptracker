export const getBPClassification = (systolic, diastolic) => {
  if (systolic >= 180 || diastolic >= 120) {
    return {
      label: 'Hypertensive Crisis',
      color: 'rgb(220, 38, 38)', // red-600
      description: 'Seek emergency care immediately'
    };
  }
  if (systolic >= 140 || diastolic >= 90) {
    return {
      label: 'High Blood Pressure (Stage 2)',
      color: 'rgb(239, 68, 68)', // red-500
      description: 'Consult your doctor'
    };
  }
  if ((systolic >= 130 && systolic < 140) || (diastolic >= 80 && diastolic < 90)) {
    return {
      label: 'High Blood Pressure (Stage 1)',
      color: 'rgb(249, 115, 22)', // orange-500
      description: 'Lifestyle changes recommended'
    };
  }
  if ((systolic >= 120 && systolic < 130) && diastolic < 80) {
    return {
      label: 'Elevated',
      color: 'rgb(234, 179, 8)', // yellow-500
      description: 'Maintain healthy lifestyle'
    };
  }
  if (systolic < 120 && diastolic < 80) {
    return {
      label: 'Normal',
      color: 'rgb(34, 197, 94)', // green-500
      description: 'Maintain healthy lifestyle'
    };
  }
  return {
    label: 'Invalid Reading',
    color: 'rgb(156, 163, 175)', // gray-400
    description: 'Please check your readings'
  };
};