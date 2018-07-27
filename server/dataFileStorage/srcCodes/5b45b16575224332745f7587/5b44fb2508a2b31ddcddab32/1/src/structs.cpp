//
//  structs.cpp
//  экз6группа
//
//  Created by Volha Vetrava on 26.06.17.
//  Copyright © 2017 Volha Vetrava. All rights reserved.
//
#include <cstring>
#include "structs.h"

std::istream& operator >> (std::istream &in, S1 &s1){
    char buff[20];
    in.getline(buff, 20);
    strcpy (s1.Word, strtok(buff, " "));
    if (strcmp(strtok(buff, " "), "-"))
    {
        strcpy(s1.Eng2, " ");
    }
        else strcpy (s1.Eng2, strtok(buff, " "));
    strcpy (&s1.Eng1, strtok(buff, " "));
    strcpy (s1.Fr, buff);
    return in;
}

std::ostream& operator << (std::ostream& out, const S1& s1){
    char *buff;
    if (s1.Eng1 == 'S')
    {
        if ((s1.Word[0] == 'A')||(s1.Word[0] == 'E')||(s1.Word[0] == 'I')||(s1.Word[0] == 'O'))
        {
            strcpy(buff, "An ");
            strcat(buff, s1.Word);
        }
        else {
            strcpy(buff,"A ");
            strcat(buff, s1.Word);
        }
        char *buff1;
        if (s1.Fr[strlen(s1.Fr)-1] == 'e')
        {
            strcpy(buff1, "Une ");
            strcat(buff1, s1.Fr);
        }
        else{
            strcpy(buff1, "Un ");
            strcat(buff1, s1.Fr);
        }
        std::cout << buff << " " << s1.Eng2 << " " << s1.Eng1 << " " << buff1 << std::endl;
    }
    
    return out;
}
