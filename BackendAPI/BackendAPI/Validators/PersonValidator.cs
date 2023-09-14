using Common.DTOs;
using FluentValidation;

namespace BackendAPI.Validators
{
    public class PersonValidator : AbstractValidator<InputPersonDTO>
    {
        public PersonValidator()
        {
            RuleFor(person => person.FirstName).NotNull().NotEmpty();
            RuleFor(person => person.LastName).NotNull().NotEmpty();
            RuleFor(person => person.UserName).NotNull().NotEmpty();
            RuleFor(person => person.Email).NotNull().NotEmpty().EmailAddress();
            RuleFor(person => person.DaysBeforeNotice).GreaterThanOrEqualTo(2);

            When(person => !string.IsNullOrEmpty(person.Password), () =>
            {
                RuleFor(person => person.Password)
                    .MinimumLength(8)
                    .Must(p => p != null && p.FirstOrDefault(c => c >= 'a' && c <= 'z') != default)
                        .WithMessage("Password should contain at least one lowercase letter")
                    .Must(p => p != null && p.FirstOrDefault(c => c >= 'A' && c <= 'Z') != default)
                        .WithMessage("Password should contain at least one uppercase letter")
                    .Must(p => p != null && p.FirstOrDefault(c => c >= '0' && c <= '9') != default)
                        .WithMessage("Password should contain at least one digit");
            });
        }
    }
}
