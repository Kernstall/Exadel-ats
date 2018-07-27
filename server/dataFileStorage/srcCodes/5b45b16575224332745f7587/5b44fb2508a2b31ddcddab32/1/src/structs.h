//
//  structs.hpp
//  экз6группа
//
//  Created by Volha Vetrava on 26.06.17.
//  Copyright © 2017 Volha Vetrava. All rights reserved.
//

#ifndef structs_h
#define structs_h

#include <stdio.h>
#include <iostream>


struct S1{
    char Word[20];
    char Eng2[10];
    char Eng1;
    char Fr[20];
    friend std::istream& operator >> (std::istream&, S1&);
    friend std::ostream& operator << (std::ostream&, const S1&);
};

struct S2{
    char Word[20];
    char Fr1;
    char Eng[30];
    friend std::istream& operator >> (std::istream&, S2&);
    friend std::ostream& operator << (std::ostream&, const S2&);
};

struct S3{
    char Word[20];
    char Eng2[10];
    int c;
    friend std::istream& operator >> (std::istream&, S3&);
    friend std::ostream& operator << (std::ostream&, const S3&);
};

#endif /* structs_h */
