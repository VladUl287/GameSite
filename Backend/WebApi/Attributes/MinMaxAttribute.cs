using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Attributes
{
    [AttributeUsage(AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
    public class MinMaxAttribute : ValidationAttribute
    {
        private readonly int min;
        private readonly int max;

        public MinMaxAttribute(int min, int max)
        {
            this.min = min;
            this.max = max;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (double.TryParse(value.ToString(), out double result))
            {
                if(result >= min && result <= max)
                {
                    return ValidationResult.Success;
                }
            }
            return new ValidationResult("Invalid rating.");
        }
    }
}
