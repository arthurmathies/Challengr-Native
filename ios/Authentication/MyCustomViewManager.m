//
//  MyCustomViewManager.m
//  Authentication
//
//  Created by Jordan Winkelman on 12/5/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "MyCustomViewManager.h"
#import "MyCustomView.h"
#import <UIKit/UIKit.h>

@implementation MyCustomViewManager

RCT_EXPORT_VIEW_PROPERTY(setRed, BOOL)

- (UIView *)view
{
	MyCustomView * theView;
	theView = [[MyCustomView alloc] init];
	return theView;
}

@end
