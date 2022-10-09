#include <stdio.h>
#include <string.h>
#include <ctype.h>

int my_printf(char *format_string, char *param)
{
	for (int i = 0; i < strlen(format_string); i++)
	{
		if ((format_string[i] == '#') && (format_string[i + 1] == 'k'))
		{
			for (int j = 0; j < strlen(param); j++)
			{
				if (islower(param[j]))
				{
					if (isdigit(param[j]))
						printf("%c", param[j]);
					else
						printf("%c", toupper(param[j]));
				}
				else
				{
					if (isdigit(param[j]))
						printf("%c", param[j]);
					else
						printf("%c", tolower(param[j]));
				}
			}

			i++;
		}
		else
			putchar(format_string[i]);
	}
	puts("");
}

int main(int argc, char *argv[])
{
	char buf[1024], buf2[1024];
	while (gets(buf))
	{
		gets(buf2);
		my_printf(buf, buf2);
	}
	return 0;
}