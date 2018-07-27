//
//  ABS_LIB.h
//  экз6группа
//
//  Created by Volha Vetrava on 26.06.17.
//  Copyright © 2017 Volha Vetrava. All rights reserved.
//

#ifndef ABS_LIB_h
#define ABS_LIB_h

#include "structs.h"


class ABS_LIB{
public:
    virtual void GetData (std::istream&) = 0;
    virtual void PutData (std::ostream&) = 0;
    virtual void Sort() = 0;
    virtual char *Find (char*) = 0;
};

class EngFr : public ABS_LIB{
    int count;
    S1 *M;
public:
    EngFr(int count = 20);
    EngFr(const EngFr&);
    void GetData (std::istream&);
    void PutData (std::ostream&);
    S1 &operator[](int );
    void Sort();
    char *Find (char*);
    ~EngFr();
};

//class FrEng : public ABS_LIB{
//    int count;
//    S2 *M;
//public:
//    FrEng(int count = 20);
//    FrEng(const FrEng&);
//    void GetData (std::istream&);
//    void PutData (std::ostream&);
//    void Sort();
//    char *Find (char*);
//    ~FrEng();
//};

//class EngCounter : public ABS_LIB{
//    int count;
//    S3 *M;
//public:
//    EngCounter(int count = 20);
//    EngCounter(const EngCounter&);
//    void GetData (std::istream&);
//    void PutData (std::ostream&);
//    void Sort();
//    char *Find (char*);
//    ~EngCounter();
//
//};

#endif /* ABS_LIB_h */
