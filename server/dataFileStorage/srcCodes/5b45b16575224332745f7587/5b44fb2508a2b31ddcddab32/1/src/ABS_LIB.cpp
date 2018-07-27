//
//  ABS_LIB.cpp
//  экз6группа
//
//  Created by Volha Vetrava on 26.06.17.
//  Copyright © 2017 Volha Vetrava. All rights reserved.
//

#include <stdio.h>
#include <iostream>
#include "ABS_LIB.h"
#include "structs.h"
#include <cstring>

int compare (const void *a, const void *b)
{
    S1* word1 = ((S1*)a);
    S1* word2 = ((S1*)b);
    if (!strcmp(word1->Word, word2->Word))
        return strcmp(word1->Eng2, word2->Eng2);
    else
        return strcmp(word1->Word, word2->Word);
}

void EngFr::GetData(std::istream &in){
    int i = 0;
    while (in >> M[i])
        i++;
    count = i;
}

void EngFr::PutData(std::ostream &out){
    for (int i = 0; i < count; i++)
        out << M[i];
}

EngFr::EngFr(int count){
    this->count = count;
    M = new S1 [count];
}

EngFr::~EngFr()
{
    count = 0;
    delete [] M;
}

EngFr::EngFr(const EngFr &A)
{
    this->count = A.count;
    this->M = new S1 [A.count];
    for (int i = 0; i < A.count; i++)
        this->M[i] = A.M[i];
}

S1 &EngFr::operator[](int i)
{
    return M[i];
}

char *EngFr::Find(char *to_f)
{
    char *str;
    strcpy(str, "not found");
    for (int i = 0; i < count; i++)
    {
        if (strcmp(M[i].Word, to_f)){
            return M[i].Fr;
        break;
        }
    }
    return str;
}

void EngFr::Sort()
{
    qsort(M, count, sizeof(S1), compare);
}


