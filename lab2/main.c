#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

int my_printf(char *format_string, char *param)
{
	int isValid = 0;
	char array[5];

	for (int i = 0; i < strlen(format_string); i++)
	{
		// if ((format_string[i] == '#') && (format_string[i + 1] == '.') && isdigit(format_string[i + 2]) && (format_string[i + 3] == 'k'))
		if ((format_string[i] == '#') && (format_string[i + 1] == '.'))
		{
			int temp = i + 2;
			int counter = 0;
			do{
				if (isdigit(format_string[temp]))
				{
					array[counter] += format_string[temp];
					temp++;
					counter++;
				}
				else
				{
					if (format_string[temp] == 'k' && counter >= 1)
						isValid = 1;
					break;
				}
			}while (1);
		}
		if (isValid == 1)
		{
			int len = atoi(array);
			if (strlen(param) < len)
				len = strlen(param);
			for (int j = 0; j < len; j++)
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

			i += 3;
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